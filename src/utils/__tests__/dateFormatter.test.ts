import { formatDate } from "../formatters/dateFormatter";

describe("dateFormatter 테스트", () => {
  it("날짜 문자열을 한국어 형식으로 변환한다", () => {
    // 월/일이 한 자리 수인 경우
    expect(formatDate("2024-01-05")).toBe("2024년 1월 5일");

    // 월/일이 두 자리 수인 경우
    expect(formatDate("2022-12-31")).toBe("2022년 12월 31일");
  });

  it("다양한 입력 형식을 처리한다", () => {
    // ISO 형식 날짜
    expect(formatDate("2023-10-20T14:30:00")).toBe("2023년 10월 20일");

    // 타임스탬프 문자열
    const timestamp = new Date("2025-06-08").toISOString();
    expect(formatDate(timestamp)).toBe("2025년 6월 8일");
  });
});
