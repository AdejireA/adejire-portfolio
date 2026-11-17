import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { WritingArticle } from "@/lib/writing-types";

// vi.mock factories are hoisted above regular top-level const declarations,
// so the fixture data must be built inside the factory itself.
vi.mock("@/lib/writing", async () => {
  const actual = await import("@/lib/writing-types");
  const fixtureArticles: WritingArticle[] = [
    {
      title: "Published Technical Piece",
      slug: "published-technical-piece",
      date: "2026-05-01",
      category: "Technical Articles",
      description: "A published article.",
      published: true,
      tags: [],
      content: "Body",
      readingTime: 3,
    },
    {
      title: "Published Essay",
      slug: "published-essay",
      date: "2026-04-01",
      category: "Essays & Perspectives",
      description: "A published essay.",
      published: true,
      tags: [],
      content: "Body",
      readingTime: 2,
    },
  ];
  return {
    ...actual,
    publishedArticles: fixtureArticles,
    getArticleBySlug: (slug: string) => fixtureArticles.find((a) => a.slug === slug),
  };
});

// Importing after the mock so Writing.tsx resolves the mocked module.
import Writing from "./Writing";

describe("Writing index", () => {
  it("shows published articles and never renders an unpublished draft", () => {
    render(
      <MemoryRouter>
        <Writing />
      </MemoryRouter>,
    );

    expect(screen.getByText("Published Technical Piece")).toBeInTheDocument();
    expect(screen.getByText("Published Essay")).toBeInTheDocument();
    expect(screen.queryByText(/draft/i)).not.toBeInTheDocument();
  });

  it("filters articles by category", () => {
    render(
      <MemoryRouter>
        <Writing />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Essays & Perspectives" }));

    expect(screen.getByText("Published Essay")).toBeInTheDocument();
    expect(screen.queryByText("Published Technical Piece")).not.toBeInTheDocument();
  });
});
