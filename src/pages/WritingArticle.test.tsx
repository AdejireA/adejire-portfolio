import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { WritingArticle } from "@/lib/writing-types";

const KNOWN_SLUG = "known-article";

// vi.mock factories are hoisted above regular top-level const declarations,
// so the fixture data must be built inside the factory itself.
vi.mock("@/lib/writing", async () => {
  const actual = await import("@/lib/writing-types");
  const knownArticle: WritingArticle = {
    title: "Known Article",
    slug: "known-article",
    date: "2026-05-01",
    category: "Technical Articles",
    description: "A known article.",
    published: true,
    tags: ["robotics"],
    content: "# Heading\n\nSome **content** here.",
    readingTime: 3,
  };
  return {
    ...actual,
    publishedArticles: [knownArticle],
    getArticleBySlug: (slug: string) => (slug === knownArticle.slug ? knownArticle : undefined),
  };
});

import WritingArticle from "./WritingArticle";

function renderAtSlug(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/writing/${slug}`]}>
      <Routes>
        <Route path="/writing/:slug" element={<WritingArticle />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("WritingArticle", () => {
  it("renders the article content for a known slug", () => {
    renderAtSlug(KNOWN_SLUG);
    expect(screen.getByText("Known Article")).toBeInTheDocument();
    expect(screen.getByText("Heading")).toBeInTheDocument();
  });

  it("shows the not-found fallback for an unknown slug", () => {
    renderAtSlug("this-slug-does-not-exist");
    expect(screen.getByText("Article not found.")).toBeInTheDocument();
  });
});
