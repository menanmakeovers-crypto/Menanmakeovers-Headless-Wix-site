// Local design preview only: the same site without the Wix hosting integration, so pages can be
// reviewed before the project is linked to Wix. The real build uses astro.config.mjs.
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  integrations: [react()],
  image: { domains: ["static.wixstatic.com"] },
  server: { port: 4321, host: "127.0.0.1" },
  devToolbar: { enabled: false },
});
