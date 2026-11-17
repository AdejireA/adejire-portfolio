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

const REQUIRED_FIELDS = ["title", "slug", "date", "category", "description"] as const;

function stripQuotes(value: string): string {
  return value.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw.trim() };

  const [, yaml, body] = match;
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;

  for (const rawLine of yaml.split(/\r?\n/)) {
    const listItem = rawLine.match(/^\s+-\s+(.*)$/);
    if (listItem && currentKey) {
      const existing = data[currentKey];
      const list = Array.isArray(existing) ? existing : (data[currentKey] = []);
      (list as string[]).push(stripQuotes(listItem[1].trim()));
      continue;
    }

    const kv = rawLine.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    currentKey = key;
    const trimmed = value.trim();

    if (trimmed === "") {
      data[key] = [];
    } else if (trimmed === "true" || trimmed === "false") {
      data[key] = trimmed === "true";
    } else {
      data[key] = stripQuotes(trimmed);
    }
  }

  return { data, content: body.trim() };
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function isValidCategory(value: unknown): value is WritingCategory {
  return typeof value === "string" && (WRITING_CATEGORIES as string[]).includes(value);
}

const rawModules = import.meta.glob("/src/content/writing/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function buildArticles(): WritingArticle[] {
  const articles: WritingArticle[] = [];

  for (const [path, raw] of Object.entries(rawModules)) {
    const { data, content } = parseFrontmatter(raw);
    const missing = REQUIRED_FIELDS.filter((field) => !data[field]);
    const categoryValid = isValidCategory(data.category);

    if (missing.length > 0 || !categoryValid) {
      if (import.meta.env.DEV) {
        console.warn(`[writing] Skipping ${path}: invalid or missing frontmatter (${[...missing, !categoryValid ? "category" : ""].filter(Boolean).join(", ")}).`);
      }
      continue;
    }

    articles.push({
      title: String(data.title),
      slug: String(data.slug),
      date: String(data.date),
      category: data.category as WritingCategory,
      description: String(data.description),
      coverImage: typeof data.coverImage === "string" && data.coverImage ? data.coverImage : undefined,
      published: data.published === true,
      tags: Array.isArray(data.tags) ? (data.tags as string[]).map(String) : [],
      content,
      readingTime: estimateReadingTime(content),
    });
  }

  return articles.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

const allArticles = buildArticles();

export const publishedArticles: WritingArticle[] = allArticles.filter((article) => article.published);

export function getArticleBySlug(slug: string): WritingArticle | undefined {
  return publishedArticles.find((article) => article.slug === slug);
}
