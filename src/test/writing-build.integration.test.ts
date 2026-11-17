// @vitest-environment node
// Running a real `vite build()` requires Node's native globals (esbuild
// asserts `new TextEncoder().encode("") instanceof Uint8Array`, which jsdom's
// patched globals break); the rest of this suite runs under jsdom, so this
// file overrides its own environment back to "node".
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const CONTENT_DIR = path.resolve(ROOT, "src/content/writing");
const OUT_DIR = path.resolve(ROOT, "dist-test-writing-marker");

const DRAFT_MARKER = "ZZZ_DRAFT_MARKER_7f3a9c2e_should_never_ship";
const PUBLISHED_MARKER = "ZZZ_PUBLISHED_MARKER_9b1d4f6a_should_ship";

const draftFile = path.join(CONTENT_DIR, "__integration_test_draft__.md");
const publishedFile = path.join(CONTENT_DIR, "__integration_test_published__.md");

function writeFixtures() {
  fs.writeFileSync(
    draftFile,
    [
      "---",
      'title: "Integration Test Draft"',
      "slug: integration-test-draft",
      "date: 2026-01-01",
      "category: Just Logs",
      'description: "temporary fixture, never published"',
      "published: false",
      "---",
      "",
      DRAFT_MARKER,
      "",
    ].join("\n"),
  );

  fs.writeFileSync(
    publishedFile,
    [
      "---",
      'title: "Integration Test Published"',
      "slug: integration-test-published",
      "date: 2026-01-01",
      "category: Just Logs",
      'description: "temporary fixture, published for comparison"',
      "published: true",
      "---",
      "",
      PUBLISHED_MARKER,
      "",
    ].join("\n"),
  );
}

function removeFixtures() {
  for (const file of [draftFile, publishedFile]) {
    if (fs.existsSync(file)) fs.rmSync(file);
  }
  if (fs.existsSync(OUT_DIR)) fs.rmSync(OUT_DIR, { recursive: true, force: true });
}

function readAllOutputText(): string {
  const chunks: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else chunks.push(fs.readFileSync(full, "utf-8"));
    }
  };
  walk(OUT_DIR);
  return chunks.join("\n");
}

// Real production build, not a unit test: verifies the fix at the level that
// actually matters — the generated JS/HTML/CSS/sourcemap output — rather than
// trusting that "hidden from /writing" implies "absent from the bundle".
describe("writing production build: draft exclusion", () => {
  beforeAll(async () => {
    removeFixtures();
    writeFixtures();
    await build({
      root: ROOT,
      configFile: path.resolve(ROOT, "vite.config.ts"),
      logLevel: "error",
      build: { outDir: OUT_DIR, emptyOutDir: true, sourcemap: true },
    });
  }, 180_000);

  afterAll(() => {
    removeFixtures();
  });

  it("never emits draft content into any generated public asset", () => {
    const text = readAllOutputText();
    expect(text).not.toContain(DRAFT_MARKER);
  });

  it("does emit published content into the generated assets (sanity check)", () => {
    const text = readAllOutputText();
    expect(text).toContain(PUBLISHED_MARKER);
  });
});
