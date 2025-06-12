import { formatDate } from "./date";

describe("date", () => {
  describe("formatDate", () => {
    it("2025-01-01을 입력하면 2025년 1월 1일을 반환한다.", () => {
      expect(formatDate("2025-01-01")).toBe("2025년 1월 1일");
    });
  });
});
