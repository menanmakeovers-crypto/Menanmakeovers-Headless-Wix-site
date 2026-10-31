// Client-review preview: a fully static build for Wix's static (drop) hosting, which serves
// files, not directories — so every page is emitted as <name>.html. The real site is built with
// astro.config.mjs; this config never ships to menanmakeovers.com.
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  outDir: "./dist-preview",
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
  image: { domains: ["static.wixstatic.com"] },
  devToolbar: { enabled: false },
});
