import { expect, afterEach, beforeAll, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { server } from "./src/mock/server.ts";

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
