import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";
import svgr from "vite-plugin-svgr";

delete process.env["CommonProgramFiles(x86)"];
delete process.env["ProgramFiles(x86)"];

export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all"), svgr()],
});
