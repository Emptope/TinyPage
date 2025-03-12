import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copy } from "vite-plugin-copy";

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { src: "manifest.json", dest: "dist" },
        { src: "public/icons", dest: "dist" },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        popup: "./src/popup/index.html",
        contentScript: "./src/contentScript/content.js",
        background: "./src/background/background.js",
      },
      output: {
        entryFileNames: "[name]/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
