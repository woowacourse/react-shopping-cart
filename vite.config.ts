import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
        { find: "@/mocks", replacement: "/src/mocks" },
      ],
    },
    define: {
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "process.env.VITE_USER_ID": JSON.stringify(env.VITE_API_USER_ID),
      "process.env.VITE_USER_PASSWORD": JSON.stringify(
        env.VITE_API_USER_PASSWORD
      ),
    },
  };
});
