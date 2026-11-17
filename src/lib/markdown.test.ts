import { describe, expect, it } from "vitest";
import { renderMarkdown } from "./markdown";

describe("renderMarkdown", () => {
  it("renders an unlabelled fenced code block without crashing", () => {
    const html = renderMarkdown(["```", "plain code, no language", "```"].join("\n"));
    expect(html).toContain("plain code, no language");
    expect(html).toContain("<pre>");
  });

  it("renders a supported language (python) with syntax highlighting markup", () => {
    const html = renderMarkdown(["```python", "def greet():", "    return 'hi'", "```"].join("\n"));
    expect(html).toContain("hljs");
    expect(html).toContain("greet");
  });

  it("renders a supported language (typescript) with syntax highlighting markup", () => {
    const html = renderMarkdown(["```typescript", "const x: number = 1;", "```"].join("\n"));
    expect(html).toContain("hljs");
    expect(html).toContain("const");
  });

  it("renders an unsupported/unregistered language without crashing", () => {
    const html = renderMarkdown(["```rust", 'fn main() { println!("hi"); }', "```"].join("\n"));
    expect(html).toContain("fn main");
  });

  it("renders an explicit plaintext fence without throwing 'Unknown language'", () => {
    expect(() => renderMarkdown(["```plaintext", "just some text", "```"].join("\n"))).not.toThrow();
    const html = renderMarkdown(["```plaintext", "just some text", "```"].join("\n"));
    expect(html).toContain("just some text");
  });

  it("escapes HTML-sensitive characters inside code blocks instead of injecting them", () => {
    const html = renderMarkdown(["```", "<script>alert('xss')</script>", "```"].join("\n"));
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("sanitizes raw HTML/script injection attempts outside of code blocks", () => {
    const html = renderMarkdown("Hello <script>alert('xss')</script> world");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("alert(");
  });

  it("still renders ordinary markdown (headings, lists, links)", () => {
    const html = renderMarkdown(["# Heading", "", "- one", "- two", "", "[a link](https://example.com)"].join("\n"));
    expect(html).toContain("<h1>Heading</h1>");
    expect(html).toContain("<li>one</li>");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('target="_blank"');
  });
});
