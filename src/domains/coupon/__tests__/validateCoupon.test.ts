import { Coupon } from "../types/response";
import { validateCoupon } from "../validations/validateCoupon";

describe("validateCoupon 함수 테스트", () => {
  const baseCoupon: Coupon = {
    id: 1,
    code: "TEST10",
    description: "테스트 쿠폰",
    expirationDate: "2025-12-31",
    discountType: "fixed",
    discount: 1000,
    minimumAmount: 10000,
  };

  const baseOrderPrice = 15000;
  const belowMinimumPrice = 5000;
  const currentDate = "2025-06-01";
  const currentTime = "14:00:00";

  it("유효한 쿠폰은 true를 반환한다", () => {
    const result = validateCoupon(
      baseCoupon,
      baseOrderPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(true);
  });

  it("만료된 쿠폰은 false를 반환한다", () => {
    const expiredCoupon = {
      ...baseCoupon,
      expirationDate: "2024-12-31",
    };

    const result = validateCoupon(
      expiredCoupon,
      baseOrderPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(false);
  });

  it("최소 주문 금액을 충족하지 않으면 false를 반환한다", () => {
    const result = validateCoupon(
      baseCoupon,
      belowMinimumPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(false);
  });

  it("최소 주문 금액이 설정되지 않은 쿠폰은 금액에 상관없이 유효하다", () => {
    const noPriceLimitCoupon = {
      ...baseCoupon,
      minimumAmount: undefined,
    };

    const result = validateCoupon(
      noPriceLimitCoupon,
      belowMinimumPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(true);
  });

  it("사용 가능 시간대 내에 있으면 true를 반환한다", () => {
    const timeRestrictedCoupon = {
      ...baseCoupon,
      availableTime: {
        start: "10:00:00",
        end: "18:00:00",
      },
    };

    const result = validateCoupon(
      timeRestrictedCoupon,
      baseOrderPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(true);
  });

  it("사용 가능 시간대를 벗어나면 false를 반환한다", () => {
    const timeRestrictedCoupon = {
      ...baseCoupon,
      availableTime: {
        start: "15:00:00",
        end: "18:00:00",
      },
    };

    const result = validateCoupon(
      timeRestrictedCoupon,
      baseOrderPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(false);
  });

  it("경계값 조건에서도 쿠폰 유효성을 올바르게 검증한다", () => {
    const boundaryCoupon = {
      ...baseCoupon,
      expirationDate: currentDate, // 오늘 날짜
      minimumAmount: baseOrderPrice, // 주문 금액과 일치
      availableTime: {
        start: currentTime, // 현재 시각
        end: "23:59:59",
      },
    };

    const result = validateCoupon(
      boundaryCoupon,
      baseOrderPrice,
      currentDate,
      currentTime
    );
    expect(result).toBe(true);
  });
});
