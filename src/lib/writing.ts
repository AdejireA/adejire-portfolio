import { publishedArticles as manifestArticles } from "virtual:writing-content";
import type { WritingArticle } from "./writing-types";

export * from "./writing-types";

export const publishedArticles: WritingArticle[] = manifestArticles;

export function getArticleBySlug(slug: string): WritingArticle | undefined {
  return publishedArticles.find((article) => article.slug === slug);
}
