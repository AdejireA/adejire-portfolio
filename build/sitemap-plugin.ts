import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { buildPublishedManifest } from "./build-manifest";
import { SITE_URL } from "../src/lib/site-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The site's fixed public routes. Mirrors src/App.tsx's route list, minus
// the catch-all 404 and the legacy /blog alias (which redirects to /writing
// and must not be listed separately).
const STATIC_ROUTES = [
  "/",
  "/projects",
  "/research",
  "/experience",
  "/leadership",
  "/about",
  "/writing",
  "/talks",
  "/awards",
  "/contact",
];

function getProjectSlugs(root: string): string[] {
  const projectsFile = path.resolve(root, "src/data/projects.ts");
  if (!fs.existsSync(projectsFile)) return [];
  const source = fs.readFileSync(projectsFile, "utf-8");
  const slugs: string[] = [];
  const pattern = /slug:\s*"([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

// Reuses the real published-article validator instead of maintaining a
// second list: an article only reaches the sitemap if it would also reach
// the actual Writing index.
function getPublishedArticleSlugs(root: string): string[] {
  const contentDir = path.resolve(root, "src/content/writing");
  if (!fs.existsSync(contentDir)) return [];
  const entries = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ file, raw: fs.readFileSync(path.join(contentDir, file), "utf-8") }));
  return buildPublishedManifest(entries).map((article) => article.slug);
}

function buildSitemapXml(urls: string[]): string {
  // No lastmod: we don't track per-page modification dates, and an invented
  // one would be worse than omitting the field (it's optional per the spec).
  const entries = urls.map((url) => `  <url><loc>${SITE_URL}${url}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

/**
 * Generates sitemap.xml at build time from the actual route list, project
 * data, and the published-writing manifest, so it can't silently drift from
 * a separately maintained list. Drafts, unknown routes, and /blog are never
 * included because none of those sources contain them.
 */
export function sitemapPlugin(root?: string): Plugin {
  const projectRoot = root ?? path.resolve(__dirname, "..");

  return {
    name: "sitemap",
    apply: "build",
    generateBundle() {
      const projectUrls = getProjectSlugs(projectRoot).map((slug) => `/projects/${slug}`);
      const articleUrls = getPublishedArticleSlugs(projectRoot).map((slug) => `/writing/${slug}`);
      const urls = [...STATIC_ROUTES, ...projectUrls, ...articleUrls];
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: buildSitemapXml(urls) });
    },
  };
}
