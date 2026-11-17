import "@testing-library/jest-dom";

// Test files that override `@vitest-environment node` (e.g. ones driving a
// real Vite build) have no `window` at all; this setup file still runs for
// them since setupFiles are global, so it must not assume jsdom is present.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}
