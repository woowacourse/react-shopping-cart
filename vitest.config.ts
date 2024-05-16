import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTest.ts"], // 필요한 경우 setup 파일 경로
    globals: true,
  },
});
