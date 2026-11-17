import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import cpp from "highlight.js/lib/languages/cpp";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      // hljs/lib/core only knows the languages registered above — it has no
      // "plaintext" definition, so falling back to that name (as opposed to
      // skipping highlighting entirely) throws "Unknown language: plaintext".
      // Any unregistered/unlabelled language falls back to escaped plain text.
      if (!lang || !hljs.getLanguage(lang)) return escapeHtml(code);
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch {
        return escapeHtml(code);
      }
    },
  }),
);

marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const isExternal = /^https?:\/\//.test(href ?? "");
      const titleAttr = title ? ` title="${title}"` : "";
      const externalAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${titleAttr}${externalAttrs}>${text}</a>`;
    },
  },
});

marked.setOptions({ gfm: true, breaks: false });

export function renderMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false }) as string;
  // DOMPurify's default allow-list excludes "target"; without ADD_ATTR it
  // silently strips the target="_blank" the renderer adds for external links.
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, ADD_ATTR: ["target"] });
}
