import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/assetsTransformer.ts",
  },
  setupFiles: ["./setupJest.ts"],
};

export default config;
