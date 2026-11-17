import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";
import { buildPublishedManifest } from "./build-manifest";

const VIRTUAL_ID = "virtual:writing-content";
const RESOLVED_VIRTUAL_ID = "\0" + VIRTUAL_ID;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin that reads src/content/writing/*.md on the Node side at build/dev
 * time, parses and validates frontmatter, and emits a virtual module containing
 * ONLY published articles. Draft content (title, body, description, etc.) never
 * enters the module graph that gets bundled for the browser — this is what makes
 * drafts safe, not just the client-side `published` filter that used to be the
 * only gate.
 */
export function writingContentPlugin(contentDir?: string): Plugin {
  const dir = contentDir ?? path.resolve(__dirname, "../src/content/writing");

  function readEntries() {
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
    return files.map((file) => ({
      file,
      raw: fs.readFileSync(path.join(dir, file), "utf-8"),
    }));
  }

  return {
    name: "writing-content",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID;
      return undefined;
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) return undefined;
      const articles = buildPublishedManifest(readEntries());
      return `export const publishedArticles = ${JSON.stringify(articles)};\n`;
    },
    configureServer(server) {
      server.watcher.add(dir);
      server.watcher.on("all", (_event, changedPath) => {
        if (!changedPath.startsWith(dir)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      });
    },
  };
}
