import { useEffect } from "react";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

type SeoOptions = {
  /** Page-specific title, without the site name suffix. */
  title: string;
  description: string;
  /** Route path, e.g. "/projects/agricultural-field-scout". */
  path: string;
  /** Excludes the page from the canonical/og:url and hints crawlers not to index it. */
  noIndex?: boolean;
};

function upsertMetaTag(attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLinkTag(rel: string, href: string) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function removeTag(selector: string) {
  document.head.querySelector(selector)?.remove();
}

/**
 * Sets per-route title/description/canonical/OG/Twitter tags on the client.
 *
 * This is a client-rendered Vite app with no server-side rendering, so this
 * only updates the DOM after the page has mounted and JS has run. Crawlers
 * and link-unfurlers that don't execute JavaScript (most social-preview
 * bots) will still see the static tags baked into index.html, not these
 * per-route ones. Reliable per-route social previews and guaranteed search
 * indexing of this content would require prerendering or SSR, which is out
 * of scope here — this hook only improves what a JS-executing crawler
 * (e.g. Googlebot) and direct in-app navigation state see.
 */
export function useSeo({ title, description, path, noIndex }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} ${SITE_NAME}`;
    document.title = fullTitle;
    upsertMetaTag("name", "description", description);
    upsertMetaTag("property", "og:title", fullTitle);
    upsertMetaTag("property", "og:description", description);
    upsertMetaTag("name", "twitter:title", fullTitle);
    upsertMetaTag("name", "twitter:description", description);

    if (noIndex) {
      upsertMetaTag("name", "robots", "noindex, follow");
      removeTag('link[rel="canonical"]');
      removeTag('meta[property="og:url"]');
      return;
    }

    removeTag('meta[name="robots"]');
    const canonical = `${SITE_URL}${path}`;
    upsertLinkTag("canonical", canonical);
    upsertMetaTag("property", "og:url", canonical);
  }, [title, description, path, noIndex]);
}
