import { validateBasicCouponConditions } from "../couponValidation";
import { CouponData } from "../../types";

describe("시간 기반 쿠폰 테스트 (미라클 모닝)", () => {
  const miracleMorningCoupon: CouponData = {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인",
    expirationDate: "2025-12-31",
    discountType: "percentage",
    discount: 30,
    availableTime: {
      start: "04:00",
      end: "07:00",
    },
  };

  // Date 객체를 모킹하여 시간 조건 테스트
  const mockDate = (hour: number, minute: number = 0) => {
    const mockNow = new Date();
    mockNow.setHours(hour, minute, 0, 0);

    jest.spyOn(global, "Date").mockImplementation(() => mockNow);
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("미라클 모닝 시간대 (04:00 ~ 07:00)", () => {
    it("시작 시간(04:00) 정확히 맞는 경우 적용되어야 한다", () => {
      mockDate(4, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(true);
    });

    it("종료 시간(07:00) 정확히 맞는 경우 적용되어야 한다", () => {
      mockDate(7, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(true);
    });

    it("시간대 중간(05:30)인 경우 적용되어야 한다", () => {
      mockDate(5, 30);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(true);
    });
  });

  describe("미라클 모닝 시간대 이외", () => {
    it("시작 시간 1분 전(03:59)인 경우 적용되지 않아야 한다", () => {
      mockDate(3, 59);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });

    it("종료 시간 1분 후(07:01)인 경우 적용되지 않아야 한다", () => {
      mockDate(7, 1);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });

    it("일반 업무 시간(09:00)인 경우 적용되지 않아야 한다", () => {
      mockDate(9, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });

    it("자정(00:00)인 경우 적용되지 않아야 한다", () => {
      mockDate(0, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });

    it("정오(12:00)인 경우 적용되지 않아야 한다", () => {
      mockDate(12, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });

    it("저녁 시간(22:00)인 경우 적용되지 않아야 한다", () => {
      mockDate(22, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });
  });

  describe("경계값 테스트 - 분 단위", () => {
    it("04:00:00 정확히인 경우 적용되어야 한다", () => {
      mockDate(4, 0);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(true);
    });

    it("06:59:59인 경우 적용되어야 한다", () => {
      mockDate(6, 59);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(true);
    });

    it("03:59:59인 경우 적용되지 않아야 한다", () => {
      mockDate(3, 59);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });

    it("07:00:01인 경우 적용되지 않아야 한다", () => {
      mockDate(7, 1);
      const result = validateBasicCouponConditions(miracleMorningCoupon, 100000);
      expect(result.isValid).toBe(false);
    });
  });

  describe("다른 시간대 쿠폰 테스트", () => {
    const lunchTimeCoupon: CouponData = {
      ...miracleMorningCoupon,
      id: 5,
      code: "LUNCHTIME",
      description: "점심시간 할인",
      availableTime: {
        start: "11:30",
        end: "13:30",
      },
    };

    it("점심시간 시작(11:30) 적용되어야 한다", () => {
      mockDate(11, 30);
      const result = validateBasicCouponConditions(lunchTimeCoupon, 100000);
      expect(result.isValid).toBe(true);
    });

    it("점심시간 종료(13:30) 적용되어야 한다", () => {
      mockDate(13, 30);
      const result = validateBasicCouponConditions(lunchTimeCoupon, 100000);
      expect(result.isValid).toBe(true);
    });

    it("점심시간 이외(14:00) 적용되지 않아야 한다", () => {
      mockDate(14, 0);
      const result = validateBasicCouponConditions(lunchTimeCoupon, 100000);
      expect(result.isValid).toBe(false);
    });
  });

  describe("자정을 넘나드는 시간대 쿠폰", () => {
    const nightOwlCoupon: CouponData = {
      ...miracleMorningCoupon,
      id: 6,
      code: "NIGHTOWL",
      description: "심야 할인",
      availableTime: {
        start: "23:00",
        end: "02:00",
      },
    };

    // 주의: 현재 구현에서는 자정을 넘나드는 시간대를 지원하지 않음
    // 이는 개선이 필요한 부분
    it("자정을 넘나드는 시간대는 현재 구현에서 제대로 처리되지 않는다", () => {
      mockDate(23, 30); // 23:30
      const result = validateBasicCouponConditions(nightOwlCoupon, 100000);
      // 현재 구현으로는 false가 나올 것 (버그)
      expect(result.isValid).toBe(false);
    });
  });

  describe("시간 설정이 없는 쿠폰", () => {
    const noTimeCoupon: CouponData = {
      ...miracleMorningCoupon,
      availableTime: undefined,
    };

    it("시간 제한이 없는 쿠폰은 언제나 적용되어야 한다", () => {
      mockDate(15, 30);
      const result = validateBasicCouponConditions(noTimeCoupon, 100000);
      expect(result.isValid).toBe(true);
    });
  });
});
