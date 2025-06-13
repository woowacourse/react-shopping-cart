import { formatCurrency } from "../formatters/currencyFormatter";

describe("currencyFormatter 테스트", () => {
  it("숫자를 한국 통화 형식으로 변환한다", () => {
    // 기본
    expect(formatCurrency(1000)).toBe("1,000원");

    // 큰 숫자
    expect(formatCurrency(1234567)).toBe("1,234,567원");

    // 0 처리
    expect(formatCurrency(0)).toBe("0원");
  });
});
