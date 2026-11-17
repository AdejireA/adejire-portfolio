/// <reference types="vite/client" />

declare module "virtual:writing-content" {
  import type { WritingArticle } from "@/lib/writing-types";
  export const publishedArticles: WritingArticle[];
}
