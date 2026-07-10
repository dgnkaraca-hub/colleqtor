#!/usr/bin/env node
/**
 * Generates public/sitemap.xml and public/robots.txt from the data layer.
 * Runs as part of `npm run build` (before vite copies public/ into dist/).
 * Both outputs are generated artifacts and gitignored.
 */
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);

const site = JSON.parse(await readFile(path.join(ROOT, "src/data/site.json"), "utf8"));
const objects = JSON.parse(await readFile(path.join(ROOT, "src/data/objects.json"), "utf8"));

// Static routes; /styleguide is an internal brand tool, left out of the map.
const STATIC_ROUTES = ["/", "/koleksiyon", "/gunluk", "/iletisim", "/resim-cizim", "/hakkimizda"];

const routes = [...STATIC_ROUTES, ...objects.map((o) => `/nesneler/${o.id}`)];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((r) => `  <url><loc>${site.url}${r}</loc></url>`).join("\n") +
  `\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`;

await writeFile(path.join(ROOT, "public/sitemap.xml"), sitemap);
await writeFile(path.join(ROOT, "public/robots.txt"), robots);
console.log(`sitemap: ${routes.length} URL(s) → public/sitemap.xml + robots.txt`);
