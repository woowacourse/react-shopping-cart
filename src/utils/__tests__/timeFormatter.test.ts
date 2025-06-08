import { formatTime, formatTimeRange } from "../formatters/timeFormatter";

describe("timeFormatter 테스트", () => {
  describe("formatTime 함수", () => {
    it("오전/오후 및 시간을 올바르게 변환한다", () => {
      expect(formatTime("00:00")).toBe("오전 12시");
      expect(formatTime("11:59")).toBe("오전 11시 59분");

      expect(formatTime("12:00")).toBe("오후 12시");
      expect(formatTime("23:59")).toBe("오후 11시 59분");
    });

    it("분 표시 로직을 올바르게 처리한다", () => {
      expect(formatTime("10:00")).toBe("오전 10시");
      expect(formatTime("14:00")).toBe("오후 2시");

      expect(formatTime("07:05")).toBe("오전 7시 5분");
      expect(formatTime("21:45")).toBe("오후 9시 45분");
    });
  });

  describe("formatTimeRange 함수", () => {
    it("시작 및 종료 시간을 올바른 형식으로 변환한다", () => {
      // 오전-오후
      expect(formatTimeRange("10:00", "12:30")).toBe(
        "오전 10시부터 오후 12시 30분까지"
      );
      // 오전-오전
      expect(formatTimeRange("08:15", "11:45")).toBe(
        "오전 8시 15분부터 오전 11시 45분까지"
      );
      // 오후-오후
      expect(formatTimeRange("13:00", "17:30")).toBe(
        "오후 1시부터 오후 5시 30분까지"
      );
    });
  });
});
