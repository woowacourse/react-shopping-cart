import { vi } from "vitest";

beforeAll(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.resetAllMocks();
});
