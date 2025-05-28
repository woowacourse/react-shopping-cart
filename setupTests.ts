import "@testing-library/jest-dom";
import { server } from "./src/mock/server.ts";

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
