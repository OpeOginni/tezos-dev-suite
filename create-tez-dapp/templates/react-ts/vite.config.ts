import { defineConfig } from 'vite'
import path from "path";

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default ({ command }: { command: string }) => {
  const isBuild = command === "build";

  return defineConfig({
    plugins: [react()],
    define: {
      global: {}
    },
    build: {
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true
      }
    },
    server: {
      port: 3000
    },
    resolve: {
      alias: {
        "@airgap/beacon-types": path.resolve(
          path.resolve(),
          `./node_modules/@airgap/beacon-types/dist/${isBuild ? "esm" : "cjs"
          }/index.js`
        ),
        // polyfills
        "readable-stream": "vite-compatible-readable-stream",
        stream: "vite-compatible-readable-stream"
      }
    }
  });
};
