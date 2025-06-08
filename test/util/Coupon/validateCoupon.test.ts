// src/util/validateCoupon.test.ts
import { describe, it, expect } from "vitest";
import { validateCoupon } from "@/util/coupon/validateCoupon";
import type { CartItem } from "@/type/CartItem";
import type { Coupon } from "@/type/Coupon";

// 테스트용 유틸리티 함수
const createCartItem = (price: number, quantity: number): CartItem => ({
  id: `item-${price}-${quantity}`,
  product: {
    id: `prod-${price}`,
    name: `Product ${price}`,
    price,
    imageUrl: "",
    category: "",
    quantity: 0,
  },
  quantity,
});

// 한국 시간대(UTC+9) 기준으로 Date 생성
const createKoreaDate = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number = 0
): Date => {
  // month는 0부터 시작 (0=1월, 6=7월)
  return new Date(year, month - 1, day, hour, minute);
};

// 기준 시간 설정 (한국 시간 기준)
const NOW = createKoreaDate(2024, 7, 15, 12, 0); // 2024년 7월 15일 12:00 (한국시간)
const YESTERDAY = createKoreaDate(2024, 7, 14, 12, 0); // 어제 12:00
const TOMORROW = createKoreaDate(2024, 7, 16, 12, 0); // 내일 12:00

const TIME_OUTSIDE_RANGE = createKoreaDate(2024, 7, 15, 8, 0); // 08:00 (사용 불가능한 시간)
const TIME_WITHIN_RANGE_START = createKoreaDate(2024, 7, 15, 10, 0); // 10:00 (사용 가능 시간 시작)
const TIME_WITHIN_RANGE_END = createKoreaDate(2024, 7, 15, 18, 0); // 18:00 (사용 가능 시간 종료)

// 기본 쿠폰 템플릿 (모든 조건 통과 가능)
const baseValidCoupon: Coupon = {
  id: "base-coupon",
  code: "VALID_COUPON",
  description: "A perfectly valid coupon",
  discountType: "amount",
  expirationDate: TOMORROW,
  discount: 1000,
  minimumAmount: undefined,
  buyQuantity: undefined,
  getQuantity: undefined,
  availableTime: undefined,
};

describe("validateCoupon 함수는", () => {
  describe("구현되지 않은 쿠폰은 유효하지 않은 쿠폰으로 판정해야함", () => {
    it("❌ 구현되지 않은 쿠폰은 유효하지 않아야 함", () => {
      const coupon: Coupon = {
        id: "unimplemented",
        expirationDate: TOMORROW,
        code: "INVALID_COUPON",
        description: "An invalid coupon",
        discountType: "earlyBird", // 존재하지 않는 할인 유형
      };
      const result = validateCoupon(coupon, [createCartItem(10000, 1)], NOW);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "invalidType",
      });
    });
  });

  describe("1. 만료일(expirationDate) 검증", () => {
    it("✅ 만료일이 설정되지 않은 경우 유효해야 함", () => {
      // @ts-expect-error: expirationDate가 undefined인 경우
      const coupon: Coupon = { ...baseValidCoupon, expirationDate: undefined };
      const result = validateCoupon(coupon, [createCartItem(10000, 1)], NOW);
      expect(result.isValid).toBe(true);
    });

    it("❌ 현재 시간이 만료일 이후인 경우 'expired' 사유로 유효하지 않아야 함", () => {
      const coupon: Coupon = {
        ...baseValidCoupon,
        expirationDate: YESTERDAY, // 어제 만료
      };
      const result = validateCoupon(coupon, [createCartItem(10000, 1)], NOW);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "expired",
      });
    });

    it("✅ 현재 시간이 만료일 이전인 경우 유효해야 함", () => {
      const coupon: Coupon = {
        ...baseValidCoupon,
        expirationDate: TOMORROW, // 내일 만료
      };
      const result = validateCoupon(coupon, [createCartItem(10000, 1)], NOW);
      expect(result.isValid).toBe(true);
    });

    it("✅ 현재 시간이 만료일과 정확히 같은 순간이라면 만료되지 않은 것으로 간주되어야 함 (경계값)", () => {
      const coupon: Coupon = {
        ...baseValidCoupon,
        expirationDate: NOW,
      };
      const result = validateCoupon(coupon, [createCartItem(10000, 1)], NOW);
      expect(result.isValid).toBe(true);
    });
  });

  describe("2. 최소 주문 금액(minimumAmount) 검증", () => {
    const couponWithMinAmount: Coupon = {
      ...baseValidCoupon,
      expirationDate: TOMORROW, // 만료일 통과
      minimumAmount: 10000,
    };

    it("✅ 최소 주문 금액이 설정되지 않은 경우 유효해야 함", () => {
      const coupon: Coupon = {
        ...baseValidCoupon,
        expirationDate: TOMORROW,
        minimumAmount: undefined,
      };
      const items = [createCartItem(5000, 1)]; // 5000원
      const result = validateCoupon(coupon, items, NOW);
      expect(result.isValid).toBe(true);
    });

    it("❌ 주문 총액이 최소 주문 금액보다 적은 경우 'minAmount' 사유로 유효하지 않아야 함", () => {
      const items = [createCartItem(9000, 1)]; // 9000원
      const result = validateCoupon(couponWithMinAmount, items, NOW);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "minAmount",
      });
    });

    it("✅ 주문 총액이 최소 주문 금액과 같은 경우 유효해야 함 (경계값)", () => {
      const items = [createCartItem(5000, 2)]; // 10000원
      const result = validateCoupon(couponWithMinAmount, items, NOW);
      expect(result.isValid).toBe(true);
    });

    it("✅ 주문 총액이 최소 주문 금액보다 큰 경우 유효해야 함", () => {
      const items = [createCartItem(10000, 1), createCartItem(1000, 1)]; // 11000원
      const result = validateCoupon(couponWithMinAmount, items, NOW);
      expect(result.isValid).toBe(true);
    });
  });

  describe("3. 사용 가능 시간(availableTime) 검증", () => {
    const couponWithTimeRange: Coupon = {
      ...baseValidCoupon,
      expirationDate: TOMORROW, // 만료일 통과
      minimumAmount: undefined, // 최소금액 조건 없음
      availableTime: { start: "10:00", end: "18:00" },
    };

    it("✅ 사용 가능 시간이 설정되지 않은 경우 유효해야 함", () => {
      const coupon: Coupon = {
        ...baseValidCoupon,
        expirationDate: TOMORROW,
        availableTime: undefined,
      };
      const items = [createCartItem(1000, 1)];
      const result = validateCoupon(coupon, items, NOW); // NOW는 12:00
      expect(result.isValid).toBe(true);
    });

    it("❌ 현재 시간이 사용 가능 시간 범위 이전인 경우 'timeRange' 사유로 유효하지 않아야 함", () => {
      const items = [createCartItem(1000, 1)];
      const result = validateCoupon(
        couponWithTimeRange,
        items,
        TIME_OUTSIDE_RANGE
      ); // 08:00 (10:00 이전)
      expect(result).toEqual({
        isValid: false,
        invalidReason: "timeRange",
      });
    });

    it("❌ 현재 시간이 사용 가능 시간 범위 이후인 경우 'timeRange' 사유로 유효하지 않아야 함", () => {
      const items = [createCartItem(1000, 1)];
      const timeAfterRange = createKoreaDate(2024, 7, 15, 18, 1); // 18:01 (종료시간 1분 뒤)
      const result = validateCoupon(couponWithTimeRange, items, timeAfterRange);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "timeRange",
      });
    });

    it("✅ 현재 시간이 사용 가능 시간 범위의 시작 시간과 같은 경우 유효해야 함 (경계값)", () => {
      const items = [createCartItem(1000, 1)];
      const result = validateCoupon(
        couponWithTimeRange,
        items,
        TIME_WITHIN_RANGE_START
      ); // 10:00
      expect(result.isValid).toBe(true);
    });

    it("✅ 현재 시간이 사용 가능 시간 범위 내에 있는 경우 유효해야 함", () => {
      const items = [createCartItem(1000, 1)];
      const result = validateCoupon(couponWithTimeRange, items, NOW); // 12:00
      expect(result.isValid).toBe(true);
    });

    it("✅ 현재 시간이 사용 가능 시간 범위의 종료 시간과 같은 경우 유효해야 함 (경계값)", () => {
      const items = [createCartItem(1000, 1)];
      const result = validateCoupon(
        couponWithTimeRange,
        items,
        TIME_WITHIN_RANGE_END
      ); // 18:00
      expect(result.isValid).toBe(true);
    });
  });

  describe("4. BOGO(Buy X Get Y) 쿠폰의 구매 수량(buyQuantity) 검증", () => {
    const bogoCoupon: Coupon = {
      ...baseValidCoupon,
      discountType: "buyXgetY",
      buyQuantity: 2, // 2개 "초과" 구매 시 적용
      getQuantity: 1,
      expirationDate: TOMORROW, // 만료일 통과
      minimumAmount: undefined, // 최소금액 조건 없음
      availableTime: undefined, // 시간 조건 없음
    };

    it("✅ 할인 유형이 'buyXgetY'가 아닌 경우 이 검증을 통과해야 함", () => {
      const coupon: Coupon = {
        ...baseValidCoupon,
        discountType: "rate",
        expirationDate: TOMORROW,
      };
      const items = [createCartItem(1000, 1)]; // BOGO 조건 미달이지만, BOGO 쿠폰이 아님
      const result = validateCoupon(coupon, items, NOW);
      expect(result.isValid).toBe(true);
    });

    it("✅ buyQuantity가 0 또는 undefined인 경우, 어떤 상품이든 1개 이상 있으면 유효해야 함", () => {
      const coupon1: Coupon = { ...bogoCoupon, buyQuantity: 0 };
      const coupon2: Coupon = { ...bogoCoupon, buyQuantity: undefined };
      const items = [createCartItem(1000, 1)]; // 1개 구매 (0보다 큼)

      const result1 = validateCoupon(coupon1, items, NOW);
      expect(result1.isValid).toBe(true);

      const result2 = validateCoupon(coupon2, items, NOW);
      expect(result2.isValid).toBe(true);
    });

    it("❌ 어떤 아이템의 수량도 buyQuantity보다 크지 않은 경우 'bogoQty' 사유로 유효하지 않아야 함 (수량 미달)", () => {
      const items = [createCartItem(1000, 1), createCartItem(2000, 1)]; // 모든 아이템 수량이 2 이하
      const result = validateCoupon(bogoCoupon, items, NOW);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "bogoQty",
      });
    });

    it("❌ 아이템의 수량이 buyQuantity와 같은 경우 'bogoQty' 사유로 유효하지 않아야 함 (경계값, 현재 로직: quantity > buyQuantity)", () => {
      const items = [createCartItem(1000, 2)]; // 수량이 정확히 2 (2 > 2 is false)
      const result = validateCoupon(bogoCoupon, items, NOW);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "bogoQty",
      });
    });

    it("✅ 아이템 중 하나라도 수량이 buyQuantity보다 큰 경우 유효해야 함", () => {
      const items = [createCartItem(1000, 3)]; // 수량이 3 (3 > 2 is true)
      const result = validateCoupon(bogoCoupon, items, NOW);
      expect(result.isValid).toBe(true);
    });

    it("✅ 여러 아이템 중 하나만 수량이 buyQuantity보다 큰 경우 유효해야 함", () => {
      const items = [
        createCartItem(1000, 1), // 1 <= 2
        createCartItem(2000, 2), // 2 <= 2
        createCartItem(3000, 3), // 3 > 2 (이것 때문에 통과)
      ];
      const result = validateCoupon(bogoCoupon, items, NOW);
      expect(result.isValid).toBe(true);
    });
  });

  describe("5. 모든 조건 만족 및 우선순위 검증", () => {
    it("✅ 모든 조건이 유효한 경우 최종적으로 유효해야 함", () => {
      const coupon: Coupon = {
        id: "all-good-coupon",
        code: "ALL_GOOD",
        description: "Perfect coupon",
        discountType: "rate",
        discount: 10,
        expirationDate: TOMORROW,
        minimumAmount: 5000,
        availableTime: { start: "09:00", end: "22:00" },
      };
      const items = [createCartItem(3000, 2)]; // 6000원
      const result = validateCoupon(coupon, items, NOW); // NOW는 12:00
      expect(result.isValid).toBe(true);
    });

    it("❌ 여러 실패 조건 중 가장 먼저 확인되는 'expired'가 반환되어야 함", () => {
      const coupon: Coupon = {
        id: "expired-first-coupon",
        code: "EXPIRED_FIRST",
        description: "Expired and low amount",
        discountType: "amount",
        discount: 100,
        expirationDate: YESTERDAY, // 만료됨 (가장 먼저 체크)
        minimumAmount: 100000, // 최소금액 미달
      };
      const items = [createCartItem(1000, 1)]; // 1000원
      const result = validateCoupon(coupon, items, NOW);
      expect(result).toEqual({
        isValid: false,
        invalidReason: "expired",
      });
    });

    it("❌ 만료일은 통과했으나 'minAmount'에서 실패하면 'minAmount'가 반환되어야 함", () => {
      const coupon: Coupon = {
        id: "min-amount-fail-coupon",
        code: "MIN_AMOUNT_FAIL",
        description: "Valid date, but low amount",
        discountType: "rate",
        discount: 10,
        expirationDate: TOMORROW, // 유효
        minimumAmount: 10000, // 최소금액 10000원
        availableTime: { start: "00:00", end: "08:00" }, // 시간 범위 미해당 (나중 순위)
      };
      const items = [createCartItem(5000, 1)]; // 5000원 (최소금액 미달)
      const result = validateCoupon(coupon, items, NOW); // NOW는 12:00
      expect(result).toEqual({
        isValid: false,
        invalidReason: "minAmount",
      });
    });

    it("❌ 만료일, 최소금액 통과 후 'timeRange'에서 실패하면 'timeRange'가 반환되어야 함", () => {
      const coupon: Coupon = {
        id: "time-range-fail-coupon",
        code: "TIME_RANGE_FAIL",
        description: "Valid date and amount, but wrong time",
        discountType: "buyXgetY",
        buyQuantity: 1,
        getQuantity: 1,
        expirationDate: TOMORROW, // 유효
        minimumAmount: 5000, // 최소금액 5000원
        availableTime: { start: "14:00", end: "16:00" }, // 현재시간(12:00) 미포함
      };
      const items = [createCartItem(6000, 2)]; // 12000원 (최소금액 충족), 수량 2 (BOGO 조건 충족)
      const result = validateCoupon(coupon, items, NOW); // NOW는 12:00
      expect(result).toEqual({
        isValid: false,
        invalidReason: "timeRange",
      });
    });
  });
});
