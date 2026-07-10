#!/usr/bin/env node
/**
 * Build-time image pipeline.
 *
 * Scans public/objects/<objectId>/NN.jpg|jpeg|png (and public/journal/<id>.jpg),
 * generates webp variants at 480/960/1600w into public/objects-optimized/,
 * and writes src/data/imageManifest.json so the app knows — statically —
 * which records have real photography and which fall back to placeholders.
 *
 * Idempotent: variants are regenerated only when the source is newer.
 * Run via `npm run images` (also wired into `npm run build`).
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const OBJECTS_DIR = path.join(ROOT, "public", "objects");
const JOURNAL_DIR = path.join(ROOT, "public", "journal");
const OPTIMIZED_DIR = path.join(ROOT, "public", "objects-optimized");
const MANIFEST_PATH = path.join(ROOT, "src", "data", "imageManifest.json");

const WIDTHS = [480, 960, 1600];
const SOURCE_EXT = /\.(jpe?g|png)$/i;

async function listDirs(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}

async function listSourceImages(dir) {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && SOURCE_EXT.test(e.name))
    .map((e) => e.name)
    .sort();
}

async function isStale(src, out) {
  if (!existsSync(out)) return true;
  const [s, o] = await Promise.all([stat(src), stat(out)]);
  return s.mtimeMs > o.mtimeMs;
}

async function optimizeOne(objectId, fileName) {
  const srcPath = path.join(OBJECTS_DIR, objectId, fileName);
  const base = fileName.replace(SOURCE_EXT, "");
  const outDir = path.join(OPTIMIZED_DIR, objectId);
  await mkdir(outDir, { recursive: true });

  const meta = await sharp(srcPath).metadata();
  const variants = {};

  for (const width of WIDTHS) {
    // Never upscale: skip widths larger than the source.
    if (meta.width && meta.width < width) continue;
    const outName = `${base}-${width}.webp`;
    const outPath = path.join(outDir, outName);
    if (await isStale(srcPath, outPath)) {
      await sharp(srcPath).resize({ width }).webp({ quality: 78 }).toFile(outPath);
    }
    variants[width] = `/objects-optimized/${objectId}/${outName}`;
  }

  return {
    src: `/objects/${objectId}/${fileName}`,
    width: meta.width ?? null,
    height: meta.height ?? null,
    variants,
  };
}

async function main() {
  const manifest = { objects: {}, journal: {} };

  for (const objectId of await listDirs(OBJECTS_DIR)) {
    const files = await listSourceImages(path.join(OBJECTS_DIR, objectId));
    if (!files.length) continue;
    manifest.objects[objectId] = [];
    for (const file of files) {
      manifest.objects[objectId].push(await optimizeOne(objectId, file));
    }
    console.log(`objects/${objectId}: ${files.length} image(s)`);
  }

  // Journal covers are single files: public/journal/<entryId>.jpg
  for (const file of await listSourceImages(JOURNAL_DIR)) {
    const id = file.replace(SOURCE_EXT, "");
    manifest.journal[id] = { src: `/journal/${file}` };
  }

  // Stable key order keeps the generated file diff-friendly.
  const sorted = {
    objects: Object.fromEntries(Object.entries(manifest.objects).sort()),
    journal: Object.fromEntries(Object.entries(manifest.journal).sort()),
  };
  await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");
  console.log(
    `manifest: ${Object.keys(sorted.objects).length} object(s), ` +
      `${Object.keys(sorted.journal).length} journal cover(s) → src/data/imageManifest.json`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
