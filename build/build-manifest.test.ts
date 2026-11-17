import { describe, expect, it, vi } from "vitest";
import { buildPublishedManifest } from "./build-manifest";

function article(frontmatter: Record<string, unknown>, body = "Body."): string {
  const lines = Object.entries(frontmatter).map(([key, value]) => {
    if (Array.isArray(value)) return `${key}:\n${value.map((v) => `  - ${v}`).join("\n")}`;
    if (typeof value === "string") return `${key}: "${value}"`;
    return `${key}: ${value}`;
  });
  return `---\n${lines.join("\n")}\n---\n\n${body}\n`;
}

describe("buildPublishedManifest", () => {
  it("includes only published articles, sorted newest first", () => {
    const entries = [
      {
        file: "old.md",
        raw: article({ title: "Old", slug: "old", date: "2026-01-01", category: "Just Logs", description: "d", published: true }),
      },
      {
        file: "new.md",
        raw: article({ title: "New", slug: "new", date: "2026-06-01", category: "Just Logs", description: "d", published: true }),
      },
      {
        file: "draft.md",
        raw: article({ title: "Draft", slug: "draft", date: "2026-03-01", category: "Just Logs", description: "d", published: false }),
      },
    ];

    const manifest = buildPublishedManifest(entries);
    expect(manifest.map((a) => a.slug)).toEqual(["new", "old"]);
  });

  it("throws a build error on duplicate published slugs naming both files", () => {
    const entries = [
      {
        file: "first.md",
        raw: article({ title: "First", slug: "dup", date: "2026-01-01", category: "Just Logs", description: "d", published: true }),
      },
      {
        file: "second.md",
        raw: article({ title: "Second", slug: "dup", date: "2026-02-01", category: "Just Logs", description: "d", published: true }),
      },
    ];

    expect(() => buildPublishedManifest(entries)).toThrow(/first\.md.*second\.md|second\.md.*first\.md/s);
  });

  it("throws a build error for a malformed PUBLISHED article", () => {
    const entries = [
      {
        file: "broken.md",
        raw: article({ slug: "broken", date: "2026-01-01", category: "Just Logs", description: "d", published: true }),
      },
    ];
    expect(() => buildPublishedManifest(entries)).toThrow(/broken\.md/);
  });

  it("silently excludes a malformed DRAFT without throwing, only warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const entries = [
      {
        file: "messy-draft.md",
        raw: article({ title: "Messy", slug: "bad slug here", date: "2026-01-01", category: "Just Logs", description: "d", published: false }),
      },
    ];

    const manifest = buildPublishedManifest(entries);
    expect(manifest).toEqual([]);
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
