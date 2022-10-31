// Merge vitest type definition for `defineConfig` of `vite`.
/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import electron from "vite-plugin-electron";
import sassDts from "vite-plugin-sass-dts";

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const minifyEnabled = env.command === "build";

  return {
    base: "./",
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
      // Override `mainFields`.
      // NOTE: Since electron uses Node.js, packages exported as "browser" in
      //  `package.json` cannot be used.
      mainFields: ["module", "jsnext:main", "jsnext"],
    },
    plugins: [
      react(),
      checker({
        typescript: true,
      }),
      // vite-plugin-sass-dts: Generate CSS Modules type definition for TypeScript.
      sassDts({
        enabledMode: ["development", "production"],
      }),
      // vite-plugin-electron: output Electron main and preload script.
      electron({
        entry: {
          // Electron main.
          electronMain: path.join(__dirname, "electron", "main", "index.ts"),
          // Electron preload.
          electronPreload: path.join(
            __dirname,
            "electron",
            "preload",
            "index.ts"
          ),
        },
        vite: {
          build: {
            outDir: "dist-electron",
          },
        },
      }),
    ],
    build: {
      outDir: "dist",
      minify: minifyEnabled,
      rollupOptions: {
        input: {
          // Electron entry point.
          electronEntryPoint: path.join(__dirname, "index.html"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
        },
      },
    },
    server: {
      host: "localhost",
      port: 5173,
    },
    test: {
      environment: "node",
    },
  };
});
