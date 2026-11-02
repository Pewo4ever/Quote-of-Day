import { env } from "node:process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: env.GITHUB_ACTIONS === "true" ? "/Quote-of-Day/" : "/",
  plugins: [react(), tailwindcss()],
});
