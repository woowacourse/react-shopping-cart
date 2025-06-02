import { describe, it, expect } from "vitest";
import { partitionCoupons } from "@/util/coupon/partitionCoupons";
import { FREE_SHIPPING_OVER } from "@/constants/priceSetting";
import type { Coupon } from "@/type/Coupon";
import type { CartItem } from "@/type/CartItem";

const item = (price: number, qty: number): CartItem => ({
  product: { price },
  quantity: qty,
});
const NOW = new Date("2025-06-03T12:00:00+09:00"); // 정오
const itemsLow = [item(3000, 2)]; // 총액 6,000 (무료배송 미만)
const itemsHigh = [item(FREE_SHIPPING_OVER + 1000, 1)]; // 한도 초과

/** 모든 테스트에 공통으로 쓸 쿠폰 목록 */
const coupons: Coupon[] = [
  /* ── 실패용 쿠폰 ── */
  { discountType: "rate", expirationDate: new Date("2025-06-01T00:00:00Z") }, // expired
  {
    discountType: "rate",
    minimumAmount: 10000,
    expirationDate: new Date("2025-06-30T00:00:00Z"), // Z 앞에 T 추가
  }, // minAmount
  {
    discountType: "rate",
    availableTime: { start: "13:00", end: "17:00" },
    expirationDate: new Date("2025-06-30T00:00:00Z"), // Z 앞에 T 추가
  }, // timeRange
  {
    discountType: "buyXgetY",
    buyQuantity: 3, // 2개 -> 3개로 변경 (수량 2개로는 부족하게)
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  }, // bogoQty (수량 부족)

  /* ── 성공용 쿠폰 ── */
  { discountType: "rate", expirationDate: new Date("2025-06-30T00:00:00Z") },
  {
    discountType: "rate",
    minimumAmount: 5000,
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  },
  {
    discountType: "rate",
    availableTime: { start: "00:00", end: "23:59" },
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  },
  {
    discountType: "buyXgetY",
    buyQuantity: 2, // 수량 2개면 통과 (총 수량 2개 >= buyQuantity 2)
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  },
  {
    discountType: "freeShipping",
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  }, // 무료배송
];

describe("partitionCoupons – 총액별로 유효·무효 분류", () => {
  const cases = [
    {
      name: "① 무료배송 기준 미만(6,000원)",
      items: itemsLow,
      expectInvalid: ["expired", "minAmount", "timeRange", "bogoQty"],
      expectValid: 5, // 성공용 쿠폰 5장 (rate 3장 + buyXgetY 1장 + freeShipping 1장)
    },
    {
      name: "② 무료배송 기준 초과(101,000원)",
      items: itemsHigh, // 수량이 1개이므로 buyXgetY는 모두 실패
      expectInvalid: ["expired", "timeRange", "bogoQty", "bogoQty", "noEffect"], // buyXgetY 2장 모두 실패 + freeShipping noEffect
      expectValid: 4, // rate 쿠폰 4장 모두 통과 (기본, minAmount 5000, minAmount 10000, 시간대 00:00-23:59)
    },
  ];

  cases.forEach(({ name, items, expectInvalid, expectValid }) => {
    it(name, () => {
      const { validCoupons, invalidCoupons } = partitionCoupons(
        coupons,
        items,
        NOW
      );

      // 개수 검증
      expect(validCoupons).toHaveLength(expectValid);
      expect(invalidCoupons).toHaveLength(expectInvalid.length);

      // 사유 검증
      const reasons = invalidCoupons.map((c: any) => c.invalidReason);
      expectInvalid.forEach((r) => expect(reasons).toContain(r));
    });
  });
});
