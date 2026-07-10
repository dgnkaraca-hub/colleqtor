import manifest from "../data/imageManifest.json";
import type { ArchiveObject, ObjectImage } from "../types";

/** One physical image known to exist on disk (from the build-time manifest). */
export interface ManifestImage {
  src: string;
  width: number | null;
  height: number | null;
  /** widthPx → webp path, e.g. { "480": "/objects-optimized/<id>/01-480.webp" } */
  variants: Record<string, string>;
}

/** A manifest image merged with the record's editorial metadata (alt/caption). */
export interface ResolvedImage extends ManifestImage {
  alt: string;
  caption?: string;
}

interface Manifest {
  objects: Record<string, ManifestImage[]>;
  journal: Record<string, { src: string }>;
}

const MANIFEST = manifest as Manifest;

/**
 * Real photography for a record, in file order (01, 02, …), with alt/caption
 * taken from the record's images[] by position. Empty array → placeholder.
 */
export function getObjectImages(obj: ArchiveObject): ResolvedImage[] {
  const files = MANIFEST.objects[obj.id] ?? [];
  return files.map((file, i) => {
    const meta: ObjectImage | undefined = obj.images?.[i];
    return {
      ...file,
      alt: meta?.alt ?? obj.title,
      caption: meta?.caption,
    };
  });
}

export function getJournalCover(entryId: string): string | undefined {
  return MANIFEST.journal[entryId]?.src;
}

/** Builds a srcset string from optimized variants; undefined when none exist. */
export function buildSrcSet(img: ManifestImage): string | undefined {
  const entries = Object.entries(img.variants);
  if (!entries.length) return undefined;
  return entries
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ");
}
