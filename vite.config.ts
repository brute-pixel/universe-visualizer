import { defineConfig } from "vite";

// Base path is set for GitHub Pages project sites (https://<user>.github.io/universe-visualizer/).
// Override with VITE_BASE when deploying elsewhere (e.g. "/" for a root domain).
export default defineConfig({
  base: process.env.VITE_BASE ?? "/universe-visualizer/",
});
