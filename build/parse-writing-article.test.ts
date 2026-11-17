import { describe, expect, it } from "vitest";
import { parseWritingArticle } from "./parse-writing-article";

function article(frontmatter: string, body = "Body text here."): string {
  return `---\n${frontmatter}\n---\n\n${body}\n`;
}

describe("parseWritingArticle", () => {
  it("parses a fully valid published article", () => {
    const raw = article(
      [
        'title: "A Real Article"',
        "slug: a-real-article",
        "date: 2026-03-04",
        "category: Technical Articles",
        "description: A short description.",
        "published: true",
        "tags:",
        "  - robotics",
        "  - embedded",
      ].join("\n"),
    );

    const result = parseWritingArticle("a.md", raw);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.article).toMatchObject({
      title: "A Real Article",
      slug: "a-real-article",
      date: "2026-03-04",
      category: "Technical Articles",
      published: true,
      tags: ["robotics", "embedded"],
    });
  });

  it("rejects a published article missing required fields, naming the file and field", () => {
    const raw = article(['slug: missing-title', "date: 2026-03-04", "category: Technical Articles", 'description: "x"', "published: true"].join("\n"));
    const result = parseWritingArticle("missing-title.md", raw);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.published).toBe(true);
    expect(result.errors.some((e) => e.includes("missing-title.md") && e.includes("title"))).toBe(true);
  });

  it("rejects slugs containing spaces or slashes", () => {
    const raw = article(['title: "Bad Slug"', "slug: bad slug/with spaces", "date: 2026-03-04", "category: Technical Articles", 'description: "x"', "published: true"].join("\n"));
    const result = parseWritingArticle("bad-slug.md", raw);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((e) => e.toLowerCase().includes("slug"))).toBe(true);
  });

  it("rejects impossible calendar dates", () => {
    const raw = article(['title: "Bad Date"', "slug: bad-date", "date: 2026-02-30", "category: Technical Articles", 'description: "x"', "published: true"].join("\n"));
    const result = parseWritingArticle("bad-date.md", raw);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((e) => e.toLowerCase().includes("date"))).toBe(true);
  });

  it("rejects an invalid category", () => {
    const raw = article(['title: "Bad Category"', "slug: bad-category", "date: 2026-03-04", "category: Not A Real Category", 'description: "x"', "published: true"].join("\n"));
    const result = parseWritingArticle("bad-category.md", raw);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.some((e) => e.toLowerCase().includes("category"))).toBe(true);
  });

  it("parses multiline YAML descriptions and inline arrays", () => {
    const raw = article(
      [
        'title: "Multiline"',
        "slug: multiline",
        "date: 2026-03-04",
        "category: Essays & Perspectives",
        "description: >",
        "  This description",
        "  spans multiple lines",
        "  and should collapse to one.",
        "published: true",
        "tags: [alpha, beta, gamma]",
      ].join("\n"),
    );
    const result = parseWritingArticle("multiline.md", raw);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.article.description).toContain("This description");
    expect(result.article.description).toContain("collapse to one.");
    expect(result.article.tags).toEqual(["alpha", "beta", "gamma"]);
  });

  it("treats a malformed draft (published is not a real boolean) as low-severity and unpublished", () => {
    const raw = article(["title: Draft", "slug: a-draft", "date: 2026-03-04", "category: Just Logs", "description: x", 'published: "yes"'].join("\n"));
    const result = parseWritingArticle("a-draft.md", raw);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.published).toBe(false);
  });

  it("accepts an article with no published field, treating it as unpublished without error", () => {
    const raw = article(['title: "No Status"', "slug: no-status", "date: 2026-03-04", "category: Just Logs", 'description: "x"'].join("\n"));
    const result = parseWritingArticle("no-status.md", raw);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.article.published).toBe(false);
  });
});
