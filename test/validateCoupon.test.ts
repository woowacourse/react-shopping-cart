// src/util/validateCoupon.test.ts
import { describe, it, expect } from "vitest";
import { validateCoupon } from "@/util/coupon/validateCoupon";
import type { Coupon } from "@/type/Coupon";
import type { CartItem } from "@/type/CartItem";

const item = (price: number, qty: number): CartItem => ({
  product: { price },
  quantity: qty,
});

const date = (iso: string) => new Date(iso);

describe("validateCoupon - 모든 규칙의 성공·실패", () => {
  const NOW = date("2025-06-03T12:00:00+09:00");
  const OUT_OF_RANGE = date("2025-06-03T08:00:00+09:00");

  [
    /* ── 1. 만료 여부 ── */
    {
      name: "❌ expired – 만료된 쿠폰",
      coupon: {
        discountType: "rate",
        expirationDate: date("2025-06-01T00:00:00Z"),
      } as Coupon,
      items: [item(1000, 1)],
      now: NOW,
      expected: { isValid: false, invalidReason: "expired" } as const,
    },
    {
      name: "✅ not expired – 유효 기간 내",
      coupon: {
        discountType: "rate",
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(1000, 1)],
      now: NOW,
      expected: { isValid: true } as const,
    },

    /* ── 2. 최소 주문 금액 ── */
    {
      name: "❌ minAmount – 주문 총액 부족",
      coupon: {
        discountType: "rate",
        minimumAmount: 10000,
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(2000, 3)], // 6,000
      now: NOW,
      expected: { isValid: false, invalidReason: "minAmount" } as const,
    },
    {
      name: "✅ meets minAmount – 주문 총액 충족",
      coupon: {
        discountType: "rate",
        minimumAmount: 5000,
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(3000, 2)], // 6,000
      now: NOW,
      expected: { isValid: true } as const,
    },

    /* ── 3. 사용 가능 시간 ── */
    {
      name: "❌ timeRange – 시간 외",
      coupon: {
        discountType: "rate",
        availableTime: { start: "09:00", end: "17:00" },
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(4000, 1)],
      now: OUT_OF_RANGE,
      expected: { isValid: false, invalidReason: "timeRange" } as const,
    },
    {
      name: "✅ within timeRange – 시간 안",
      coupon: {
        discountType: "rate",
        availableTime: { start: "09:00", end: "17:00" },
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(4000, 1)],
      now: NOW,
      expected: { isValid: true } as const,
    },

    {
      name: "❌ not bogoQty – 수량 미달(실패)",
      coupon: {
        discountType: "buyXgetY",
        buyQuantity: 2,
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(1000, 1)],
      now: NOW,
      expected: { isValid: false, invalidReason: "bogoQty" } as const,
    },
    {
      name: "✅ not bogoQty – 수량 같음(성공)",
      coupon: {
        discountType: "buyXgetY",
        buyQuantity: 2,
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(1000, 2)],
      now: NOW,
      expected: { isValid: true } as const,
    },
    {
      name: "✅ not bogoQty – 수량 충족(성공)",
      coupon: {
        discountType: "buyXgetY",
        buyQuantity: 2,
        expirationDate: date("2025-06-30T00:00:00Z"),
      } as Coupon,
      items: [item(1000, 3)],
      now: NOW,
      expected: { isValid: true } as const,
    },
  ].forEach(({ name, coupon, items, now, expected }) => {
    it(name, () => {
      const result = validateCoupon(coupon, items, now);
      expect(result).toEqual(expected);
    });
  });
});
