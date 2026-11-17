import type { WritingArticle } from "../src/lib/writing-types";
import { parseWritingArticle } from "./parse-writing-article";

export type WritingSourceEntry = { file: string; raw: string };

/**
 * Builds the published-articles manifest from raw source files.
 *
 * - A malformed PUBLISHED article (published: true, but failing schema validation,
 *   including duplicate slugs) is a build error: it is actionable and must not go live
 *   with broken data.
 * - A malformed DRAFT (published is false, absent, or not a real boolean) is excluded
 *   silently from the manifest. It is never a build error, because a draft is allowed
 *   to be a work in progress — but it also must never leak into the manifest, which is
 *   the only thing that reaches the browser bundle.
 *
 * Pure function: no filesystem access, safe to unit test with literal fixtures.
 */
export function buildPublishedManifest(entries: WritingSourceEntry[]): WritingArticle[] {
  const published: WritingArticle[] = [];
  const seenSlugs = new Map<string, string>();

  for (const { file, raw } of entries) {
    const result = parseWritingArticle(file, raw);

    if (!result.ok) {
      if (result.published) {
        throw new Error(`[writing] Cannot publish ${file}:\n  - ${result.errors.join("\n  - ")}`);
      }
      // Malformed draft: warn only, never block the build, never publish.
      console.warn(`[writing] Skipping draft ${file}: ${result.errors.join("; ")}`);
      continue;
    }

    if (!result.article.published) continue;

    const existingFile = seenSlugs.get(result.article.slug);
    if (existingFile) {
      throw new Error(
        `[writing] Duplicate published slug "${result.article.slug}" found in both "${existingFile}" and "${file}". Slugs must be unique.`,
      );
    }
    seenSlugs.set(result.article.slug, file);
    published.push(result.article);
  }

  return published.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
