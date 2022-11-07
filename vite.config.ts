// Merge vitest type definition for `defineConfig` of `vite`.
/// <reference types="vitest" />

import path from "path";
import { defineConfig } from "vite";
import type { AliasOptions, UserConfig } from "vite";
import type { RollupOptions } from "rollup";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import electron from "vite-plugin-electron";
import sassDts from "vite-plugin-sass-dts";
import packageJson from "./package.json";

const defineVariables = (): UserConfig["define"] => {
  return {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  };
};

const aliasVariables = (): AliasOptions => {
  return {
    "@/src/": path.posix.join(__dirname, "src/"),
  };
};

const checkerPlugin = () =>
  checker({
    typescript: true,
  });

const rollupOutputOptions = (): RollupOptions["output"] => {
  // NOTE: Here `rollupOptions.output.chunkFileNames` is specified, but the
  //  chunk files cannot be loaded with `require()` and `import ... from` to
  //  load chunk files.
  //  Electron does not support loading other scripts packaged in Electron, even
  //  with relative paths, unless the `file://` protocol is specified in
  //  `require()`.
  //  Typescript's `import type ... from` works because it is an `import` of
  //  type information and will be removed from the transpiled script.
  //  See: https://github.com/electron/electron/issues/2414
  return {
    entryFileNames: "[name].js",
    chunkFileNames: "[name].js",
    assetFileNames: "assets/[name].[ext]",
  };
};

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
      define: defineVariables(),
      resolve: {
        alias: {
          ...aliasVariables(),
          "@/electron/main/": path.posix.join(__dirname, "electron", "main/"),
          "@/electron/preload/": path.posix.join(
            __dirname,
            "electron",
            "preload/"
          ),
        },
      },
      build: {
        outDir: "dist/electron",
        rollupOptions: {
          output: rollupOutputOptions(),
        },
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
      alias: aliasVariables(),
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
    define: defineVariables(),
    build: {
      outDir: "dist/src",
      minify: minifyEnabled,
      rollupOptions: {
        input: {
          // Electron entry point.
          electronEntryPoint: path.join(__dirname, "index.html"),
        },
        output: rollupOutputOptions(),
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
    // https://vitest.dev/config/
    test: {
      // To use some Jest custom matchers with Vitest, we need to be able to
      // call `expect.extend()` globally.
      globals: true,
      // `happy-dom` is compatible with `jsdom`, so you can use
      // `@testing-library/jest-dom` and `@testing-library/react`.
      environment: "happy-dom",
      restoreMocks: true,
      setupFiles: path.join(__dirname, "src", "tests", "setup.ts"),
    },
  };
});
