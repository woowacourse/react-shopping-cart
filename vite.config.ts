import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: "@/styles", replacement: "/src/styles" },
      { find: "@/components", replacement: "/src/components" },
      { find: "@/types", replacement: "/src/types" },
      { find: "@/pages", replacement: "/src/pages" },
      { find: "@/hooks", replacement: "/src/hooks" },
      { find: "@/assets", replacement: "/src/assets" },
      { find: "@/recoil", replacement: "/src/recoil" },
      { find: "@/apis", replacement: "/src/apis" },
      { find: "@/utils", replacement: "/src/utils" },
      { find: "@/constants", replacement: "/src/constants" },
      { find: "@/auth", replacement: "/src/auth" },
    ],
  },
});
