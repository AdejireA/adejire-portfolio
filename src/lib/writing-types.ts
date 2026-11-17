export type WritingCategory =
  | "Technical Articles"
  | "Research Notes"
  | "Just Logs"
  | "Essays & Perspectives";

export const WRITING_CATEGORIES: WritingCategory[] = [
  "Technical Articles",
  "Research Notes",
  "Just Logs",
  "Essays & Perspectives",
];

export type WritingArticle = {
  title: string;
  slug: string;
  date: string;
  category: WritingCategory;
  description: string;
  coverImage?: string;
  published: boolean;
  tags: string[];
  content: string;
  readingTime: number;
};
