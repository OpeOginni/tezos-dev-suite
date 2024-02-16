import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ command }) => {
  const isBuild = command === "build";

  return defineConfig({
    plugins: [react()],
    define: {
      global: {},
    },
    build: {
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      port: 4000,
    },
    resolve: {
      alias: {
        "@airgap/beacon-types": path.resolve(
          path.resolve(),
          `./node_modules/@airgap/beacon-types/dist/${
            isBuild ? "esm" : "cjs"
          }/index.js`
        ),
        // polyfills
        "readable-stream": "vite-compatible-readable-stream",
        stream: "vite-compatible-readable-stream",
      },
    },
  });
};
