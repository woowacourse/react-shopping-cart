import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { server } from "../src/domains/shopping-cart/mocks/server";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
