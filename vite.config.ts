import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// For GitHub Pages under a sub-path, set `base: "/<repo-name>/"`.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
});
