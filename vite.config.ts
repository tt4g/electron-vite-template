// Merge vitest type definition for `defineConfig` of `vite`.
/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import electron from "vite-plugin-electron";
import sassDts from "vite-plugin-sass-dts";
import packageJson from "./package.json";

const defineElement = (): UserConfig["define"] => {
  return {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  };
};

const checkerPlugin = () =>
  checker({
    typescript: true,
  });

const electronPlugin = () => {
  // vite-plugin-electron: output Electron main and preload script.
  return electron({
    entry: {
      // Electron main.
      electronMain: path.join(__dirname, "electron", "main", "index.ts"),
      // Electron preload.
      electronPreload: path.join(__dirname, "electron", "preload", "index.ts"),
    },
    vite: {
      plugins: [checkerPlugin()],
      define: defineElement(),
      build: {
        outDir: "dist-electron",
      },
    },
  });
};

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const minifyEnabled = env.command === "build";

  return {
    root: __dirname,
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
      checkerPlugin(),
      // vite-plugin-sass-dts: Generate CSS Modules type definition for TypeScript.
      sassDts({
        enabledMode: ["development", "production"],
      }),
      electronPlugin(),
    ],
    define: defineElement(),
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
        external: [
          // Bundled javascript sources are evaluated by the Electron process,
          // so there is no need to bundle `electron` dependencies.
          "electron",
        ],
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
