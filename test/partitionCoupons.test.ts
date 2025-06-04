// src/util/partitionCoupons.test.ts
import { describe, it, expect } from "vitest";
import { partitionCoupons } from "@/util/coupon/partitionCoupons";
import type { CartItem } from "@/type/CartItem";
import type { Coupon } from "@/type/Coupon";

// 테스트용 유틸리티 함수
const createCartItem = (price: number, quantity: number): CartItem => ({
  product: { id: `prod-${price}`, name: `Product ${price}`, price },
  quantity,
});

// 한국 시간대 기준으로 Date 생성
const createKoreaDate = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number = 0
): Date => {
  return new Date(year, month - 1, day, hour, minute);
};

// 기준 시간 설정
const NOW = createKoreaDate(2024, 7, 15, 12, 0); // 2024년 7월 15일 12:00
const YESTERDAY = createKoreaDate(2024, 7, 14, 12, 0);
const TOMORROW = createKoreaDate(2024, 7, 16, 12, 0);

// 테스트용 쿠폰들
const VALID_COUPON_1: Coupon = {
  code: "VALID1",
  description: "Valid coupon 1",
  discountType: "amount",
  discountValue: 1000,
  expirationDate: TOMORROW,
  minimumAmount: 5000,
  availableTime: { start: "10:00", end: "18:00" },
};

const VALID_COUPON_2: Coupon = {
  code: "VALID2",
  description: "Valid coupon 2",
  discountType: "rate",
  discountValue: 10,
  // 조건 없음 - 모든 경우에 유효
};

const EXPIRED_COUPON: Coupon = {
  code: "EXPIRED",
  description: "Expired coupon",
  discountType: "amount",
  discountValue: 2000,
  expirationDate: YESTERDAY, // 만료됨
};

const MIN_AMOUNT_FAIL_COUPON: Coupon = {
  code: "MIN_AMOUNT_FAIL",
  description: "Minimum amount fail coupon",
  discountType: "rate",
  discountValue: 15,
  expirationDate: TOMORROW,
  minimumAmount: 50000, // 높은 최소 금액
};

const TIME_RANGE_FAIL_COUPON: Coupon = {
  code: "TIME_RANGE_FAIL",
  description: "Time range fail coupon",
  discountType: "amount",
  discountValue: 3000,
  expirationDate: TOMORROW,
  minimumAmount: 1000,
  availableTime: { start: "02:00", end: "05:00" }, // 현재 시간(12:00) 범위 밖
};

const BOGO_FAIL_COUPON: Coupon = {
  code: "BOGO_FAIL",
  description: "BOGO fail coupon",
  discountType: "buyXgetY",
  discountValue: 0,
  buyQuantity: 5, // 높은 구매 수량 요구
  getYQuantity: 1,
  expirationDate: TOMORROW,
};

describe("partitionCoupons 함수 검증", () => {
  describe("1. 기본 동작 검증", () => {
    it("✅ 빈 쿠폰 배열에 대해 빈 결과를 반환해야 함", () => {
      const items = [createCartItem(10000, 1)];
      const result = partitionCoupons([], items, NOW);

      expect(result.validCoupons.size).toBe(0);
      expect(result.invalidCoupons.size).toBe(0);
      expect(Array.from(result.validCoupons)).toEqual([]);
      expect(Array.from(result.invalidCoupons)).toEqual([]);
    });

    it("✅ 모든 쿠폰이 유효한 경우 validCoupons에만 포함되어야 함", () => {
      const coupons = [VALID_COUPON_1, VALID_COUPON_2];
      const items = [createCartItem(10000, 1)]; // 모든 조건 만족
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(2);
      expect(result.invalidCoupons.size).toBe(0);
      expect(Array.from(result.validCoupons)).toEqual(
        expect.arrayContaining([VALID_COUPON_1, VALID_COUPON_2])
      );
    });

    it("❌ 모든 쿠폰이 유효하지 않은 경우 invalidCoupons에만 포함되어야 함", () => {
      const coupons = [EXPIRED_COUPON, MIN_AMOUNT_FAIL_COUPON];
      const items = [createCartItem(1000, 1)]; // 최소 금액 미달
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(0);
      expect(result.invalidCoupons.size).toBe(2);

      const invalidArray = Array.from(result.invalidCoupons);
      expect(invalidArray).toHaveLength(2);
      expect(invalidArray.map((item) => item.coupon)).toEqual(
        expect.arrayContaining([EXPIRED_COUPON, MIN_AMOUNT_FAIL_COUPON])
      );
      expect(invalidArray.map((item) => item.invalidReason)).toEqual(
        expect.arrayContaining(["expired", "minAmount"])
      );
    });

    it("✅ 유효한 쿠폰과 유효하지 않은 쿠폰이 섞여있는 경우 올바르게 분리되어야 함", () => {
      const coupons = [
        VALID_COUPON_2,
        EXPIRED_COUPON,
        VALID_COUPON_1,
        TIME_RANGE_FAIL_COUPON,
      ];
      const items = [createCartItem(10000, 1)];
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(2);
      expect(result.invalidCoupons.size).toBe(2);

      expect(Array.from(result.validCoupons)).toEqual(
        expect.arrayContaining([VALID_COUPON_1, VALID_COUPON_2])
      );

      const invalidArray = Array.from(result.invalidCoupons);
      expect(invalidArray.map((item) => item.coupon)).toEqual(
        expect.arrayContaining([EXPIRED_COUPON, TIME_RANGE_FAIL_COUPON])
      );
      expect(invalidArray.map((item) => item.invalidReason)).toEqual(
        expect.arrayContaining(["expired", "timeRange"])
      );
    });
  });

  describe("2. 다양한 실패 사유별 검증", () => {
    it("❌ 만료된 쿠폰은 'expired' 사유로 invalidCoupons에 포함되어야 함", () => {
      const coupons = [EXPIRED_COUPON];
      const items = [createCartItem(10000, 1)];
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(0);
      expect(result.invalidCoupons.size).toBe(1);

      const [invalidItem] = Array.from(result.invalidCoupons);
      expect(invalidItem.coupon).toBe(EXPIRED_COUPON);
      expect(invalidItem.invalidReason).toBe("expired");
    });

    it("❌ 최소 금액 미달 쿠폰은 'minAmount' 사유로 invalidCoupons에 포함되어야 함", () => {
      const coupons = [MIN_AMOUNT_FAIL_COUPON];
      const items = [createCartItem(1000, 1)]; // 1000원 < 50000원
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(0);
      expect(result.invalidCoupons.size).toBe(1);

      const [invalidItem] = Array.from(result.invalidCoupons);
      expect(invalidItem.coupon).toBe(MIN_AMOUNT_FAIL_COUPON);
      expect(invalidItem.invalidReason).toBe("minAmount");
    });

    it("❌ 시간 범위 밖 쿠폰은 'timeRange' 사유로 invalidCoupons에 포함되어야 함", () => {
      const coupons = [TIME_RANGE_FAIL_COUPON];
      const items = [createCartItem(10000, 1)];
      const result = partitionCoupons(coupons, items, NOW); // 12:00는 02:00-05:00 범위 밖

      expect(result.validCoupons.size).toBe(0);
      expect(result.invalidCoupons.size).toBe(1);

      const [invalidItem] = Array.from(result.invalidCoupons);
      expect(invalidItem.coupon).toBe(TIME_RANGE_FAIL_COUPON);
      expect(invalidItem.invalidReason).toBe("timeRange");
    });

    it("❌ BOGO 수량 미달 쿠폰은 'bogoQty' 사유로 invalidCoupons에 포함되어야 함", () => {
      const coupons = [BOGO_FAIL_COUPON];
      const items = [createCartItem(1000, 3)]; // 3개 < 5개 (buyQuantity 미달)
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(0);
      expect(result.invalidCoupons.size).toBe(1);

      const [invalidItem] = Array.from(result.invalidCoupons);
      expect(invalidItem.coupon).toBe(BOGO_FAIL_COUPON);
      expect(invalidItem.invalidReason).toBe("bogoQty");
    });
  });

  describe("3. 경계값 및 특수 케이스 검증", () => {
    it("✅ 하나의 쿠폰이 여러 번 포함되어도 중복 제거되어야 함 (Set 특성)", () => {
      const duplicatedCoupons = [
        VALID_COUPON_1,
        VALID_COUPON_1,
        VALID_COUPON_1,
      ];
      const items = [createCartItem(10000, 1)];
      const result = partitionCoupons(duplicatedCoupons, items, NOW);

      expect(result.validCoupons.size).toBe(1);
      expect(result.invalidCoupons.size).toBe(0);
      expect(Array.from(result.validCoupons)[0]).toBe(VALID_COUPON_1);
    });

    it("✅ 경계값 조건에서 유효한 쿠폰이 올바르게 분류되어야 함", () => {
      const boundaryCoupon: Coupon = {
        code: "BOUNDARY",
        description: "Boundary test coupon",
        discountType: "amount",
        discountValue: 1000,
        expirationDate: NOW, // 현재 시간과 정확히 같음
        minimumAmount: 10000, // 정확히 같은 금액
        availableTime: { start: "12:00", end: "18:00" }, // 현재 시간이 시작 시간
      };

      const coupons = [boundaryCoupon];
      const items = [createCartItem(5000, 2)]; // 정확히 10000원
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons.size).toBe(1);
      expect(result.invalidCoupons.size).toBe(0);
      expect(Array.from(result.validCoupons)[0]).toBe(boundaryCoupon);
    });
  });

  describe("4. 복합 조건 검증", () => {
    it("✅ 복잡한 시나리오: 다양한 조건의 쿠폰들이 올바르게 분류되어야 함", () => {
      const complexCoupons = [
        VALID_COUPON_1, // 유효
        VALID_COUPON_2, // 유효
        EXPIRED_COUPON, // 만료
        MIN_AMOUNT_FAIL_COUPON, // 최소금액 미달
        TIME_RANGE_FAIL_COUPON, // 시간 범위 밖
        BOGO_FAIL_COUPON, // BOGO 수량 미달
      ];

      const items = [createCartItem(10000, 2)]; // 20000원, 각 2개씩
      const result = partitionCoupons(complexCoupons, items, NOW);

      // 유효한 쿠폰: VALID_COUPON_1, VALID_COUPON_2
      expect(result.validCoupons.size).toBe(2);
      expect(Array.from(result.validCoupons)).toEqual(
        expect.arrayContaining([VALID_COUPON_1, VALID_COUPON_2])
      );

      // 무효한 쿠폰: 나머지 4개
      expect(result.invalidCoupons.size).toBe(4);

      const invalidArray = Array.from(result.invalidCoupons);
      const invalidReasons = invalidArray.map((item) => item.invalidReason);
      expect(invalidReasons).toEqual(
        expect.arrayContaining(["expired", "minAmount", "timeRange", "bogoQty"])
      );
    });

    it("✅ 조건을 만족하도록 변경했을 때 분류가 바뀌어야 함", () => {
      // 첫 번째: 최소 금액 미달로 무효
      const items1 = [createCartItem(1000, 1)]; // 1000원
      const result1 = partitionCoupons([MIN_AMOUNT_FAIL_COUPON], items1, NOW);

      expect(result1.validCoupons.size).toBe(0);
      expect(result1.invalidCoupons.size).toBe(1);

      // 두 번째: 최소 금액 충족으로 유효
      const items2 = [createCartItem(50000, 1)]; // 50000원
      const result2 = partitionCoupons([MIN_AMOUNT_FAIL_COUPON], items2, NOW);

      expect(result2.validCoupons.size).toBe(1);
      expect(result2.invalidCoupons.size).toBe(0);
    });
  });

  describe("5. 시간 매개변수 검증", () => {
    it("✅ now 매개변수가 제공되지 않으면 현재 시간을 사용해야 함", () => {
      const timeSpecificCoupon: Coupon = {
        code: "TIME_SPECIFIC",
        description: "Time specific coupon",
        discountType: "amount",
        discountValue: 1000,
        expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24시간 후
      };

      const coupons = [timeSpecificCoupon];
      const items = [createCartItem(1000, 1)];

      // now 매개변수 없이 호출
      const result = partitionCoupons(coupons, items);

      // 미래의 만료일이므로 유효해야 함
      expect(result.validCoupons.size).toBe(1);
      expect(result.invalidCoupons.size).toBe(0);
    });

    it("❌ 특정 시간에서는 무효하지만 다른 시간에서는 유효한 쿠폰", () => {
      const morningTime = createKoreaDate(2024, 7, 15, 3, 0); // 03:00
      const afternoonTime = createKoreaDate(2024, 7, 15, 15, 0); // 15:00

      const coupons = [TIME_RANGE_FAIL_COUPON]; // 02:00-05:00만 사용 가능
      const items = [createCartItem(10000, 1)];

      // 오전 3시: 유효 (02:00-05:00 범위 내)
      const morningResult = partitionCoupons(coupons, items, morningTime);
      expect(morningResult.validCoupons.size).toBe(1);
      expect(morningResult.invalidCoupons.size).toBe(0);

      // 오후 3시: 무효 (02:00-05:00 범위 밖)
      const afternoonResult = partitionCoupons(coupons, items, afternoonTime);
      expect(afternoonResult.validCoupons.size).toBe(0);
      expect(afternoonResult.invalidCoupons.size).toBe(1);

      const [invalidItem] = Array.from(afternoonResult.invalidCoupons);
      expect(invalidItem.invalidReason).toBe("timeRange");
    });
  });

  describe("6. 반환 타입 검증", () => {
    it("✅ 반환되는 validCoupons와 invalidCoupons가 Set 타입이어야 함", () => {
      const coupons = [VALID_COUPON_1, EXPIRED_COUPON];
      const items = [createCartItem(10000, 1)];
      const result = partitionCoupons(coupons, items, NOW);

      expect(result.validCoupons).toBeInstanceOf(Set);
      expect(result.invalidCoupons).toBeInstanceOf(Set);
    });

    it("✅ invalidCoupons의 각 요소가 올바른 구조를 가져야 함", () => {
      const coupons = [EXPIRED_COUPON, MIN_AMOUNT_FAIL_COUPON];
      const items = [createCartItem(1000, 1)];
      const result = partitionCoupons(coupons, items, NOW);

      const invalidArray = Array.from(result.invalidCoupons);

      invalidArray.forEach((item) => {
        expect(item).toHaveProperty("coupon");
        expect(item).toHaveProperty("invalidReason");
        expect(typeof item.coupon).toBe("object");
        expect(typeof item.invalidReason).toBe("string");
        expect(["expired", "minAmount", "timeRange", "bogoQty"]).toContain(
          item.invalidReason
        );
      });
    });
  });
});
