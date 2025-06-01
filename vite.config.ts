import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: "@emotion/react" }), EnvironmentPlugin("all")],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
