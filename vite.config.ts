import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// Fixed dev/preview port 5188 — unique within the dgn-karaca portfolio
// (Doğan 5173 · handpan 5180 · Sam'al 5185 · Göbekli 5186 · Third Brain 5187).
// strictPort: fail loudly instead of silently hopping to another port.
// For GitHub Pages under a sub-path, set `base: "/<repo-name>/"`.
export default defineConfig({
  plugins: [react()],
  server: { port: 5188, strictPort: true },
  preview: { port: 5188, strictPort: true },
});
