import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { handlers, resetCartItems } from "./src/mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  resetCartItems();
});
