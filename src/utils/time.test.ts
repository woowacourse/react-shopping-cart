import { formatTime } from "./time";

describe("time", () => {
  describe("formatTime", () => {
    it("04:00:00을 입력하면 오전 4시 00분을 반환한다.", () => {
      expect(formatTime("04:00:00")).toBe("오전 4시 00분");
    });
  });
});
