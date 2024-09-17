/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: "jsdom",
    setupFiles: ["test/setup.ts"],
  },
});
