import matter from "gray-matter";
import * as yaml from "js-yaml";
import { isValid, parseISO, format } from "date-fns";
import { WRITING_CATEGORIES, type WritingArticle, type WritingCategory } from "../src/lib/writing-types";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export type ParseResult =
  | { ok: true; article: WritingArticle }
  | { ok: false; errors: string[]; published: boolean };

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function isValidCategory(value: unknown): value is WritingCategory {
  return typeof value === "string" && (WRITING_CATEGORIES as string[]).includes(value);
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) return false;
  const parsed = parseISO(value);
  if (!isValid(parsed)) return false;
  // Rejects calendar overflow (e.g. 2026-02-30, which Date silently rolls into March).
  return format(parsed, "yyyy-MM-dd") === value;
}

/**
 * Parses and validates a single writing-article file's frontmatter + body.
 * Pure function: no filesystem or Vite access, safe to unit test directly.
 */
export function parseWritingArticle(file: string, raw: string): ParseResult {
  let data: Record<string, unknown>;
  let content: string;

  try {
    // YAML's default core schema auto-coerces an unquoted `date: 2026-03-04`
    // into a JS Date (and silently rolls over impossible dates while doing
    // it), and 1.1-style scalars like `yes`/`on` into booleans. JSON_SCHEMA
    // keeps plain scalars as strings/booleans in JSON's stricter sense, so
    // our own validators see and check the actual written value.
    const parsed = matter(raw, {
      engines: {
        yaml: (input: string) => (yaml.load(input, { schema: yaml.JSON_SCHEMA }) ?? {}) as object,
      },
    });
    data = parsed.data as Record<string, unknown>;
    content = parsed.content.trim();
  } catch (error) {
    return {
      ok: false,
      errors: [`${file}: could not parse frontmatter (${(error as Error).message})`],
      published: false,
    };
  }

  const errors: string[] = [];
  const published = data.published === true;

  if (typeof data.title !== "string" || data.title.trim() === "") {
    errors.push(`${file}: "title" is required and must be a non-empty string`);
  }

  if (typeof data.slug !== "string" || data.slug.trim() === "") {
    errors.push(`${file}: "slug" is required and must be a non-empty string`);
  } else if (!SLUG_PATTERN.test(data.slug)) {
    errors.push(
      `${file}: "slug" ("${data.slug}") must be URL-safe: lowercase letters, numbers, and hyphens only, no spaces or slashes`,
    );
  }

  if (!isValidDate(data.date)) {
    errors.push(`${file}: "date" ("${String(data.date)}") must be a valid, real calendar date in YYYY-MM-DD form`);
  }

  if (!isValidCategory(data.category)) {
    errors.push(
      `${file}: "category" ("${String(data.category)}") must be one of: ${WRITING_CATEGORIES.join(", ")}`,
    );
  }

  if (typeof data.description !== "string" || data.description.trim() === "") {
    errors.push(`${file}: "description" is required and must be a non-empty string`);
  }

  if (data.coverImage !== undefined && typeof data.coverImage !== "string") {
    errors.push(`${file}: "coverImage" must be a string when present`);
  }

  if (data.published !== undefined && typeof data.published !== "boolean") {
    errors.push(`${file}: "published" must be a boolean (true or false), got "${String(data.published)}"`);
  }

  if (data.tags !== undefined && !(Array.isArray(data.tags) && data.tags.every((tag) => typeof tag === "string"))) {
    errors.push(`${file}: "tags" must be an array of strings when present`);
  }

  if (errors.length > 0) {
    return { ok: false, errors, published };
  }

  return {
    ok: true,
    article: {
      title: (data.title as string).trim(),
      slug: data.slug as string,
      date: data.date as string,
      category: data.category as WritingCategory,
      description: (data.description as string).trim(),
      coverImage: typeof data.coverImage === "string" && data.coverImage ? data.coverImage : undefined,
      published,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
      readingTime: estimateReadingTime(content),
    },
  };
}
