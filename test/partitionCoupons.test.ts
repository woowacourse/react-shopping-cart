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
const itemsHigh = [item(FREE_SHIPPING_OVER + 1000, 1)]; // 한도 초과, 수량 1개로 수정

/** 모든 테스트에 공통으로 쓸 쿠폰 목록 */
const coupons: Coupon[] = [
  /* ── 실패용 쿠폰 ── */
  { discountType: "rate", expirationDate: new Date("2025-06-01T00:00:00Z") }, // expired
  {
    discountType: "rate",
    minimumAmount: 10000,
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  }, // minAmount (itemsLow에서만 실패)
  {
    discountType: "rate",
    availableTime: { start: "13:00", end: "17:00" },
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  }, // timeRange (정오라 실패)
  {
    discountType: "buyXgetY",
    buyQuantity: 3, // 수량 3개로 변경 (itemsLow 총 2개 < 3이므로 실패)
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  }, // bogoQty (수량 부족)

  /* ── 성공용 쿠폰 ── */
  { discountType: "rate", expirationDate: new Date("2025-06-30T00:00:00Z") },
  {
    discountType: "rate",
    minimumAmount: 3000, // itemsLow(6000)에서는 통과, itemsHigh에서도 통과
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  },
  {
    discountType: "rate",
    availableTime: { start: "00:00", end: "23:59" },
    expirationDate: new Date("2025-06-30T00:00:00Z"),
  },
  {
    discountType: "buyXgetY",
    buyQuantity: 1, // 수량 1개면 통과 (itemsLow 총 2개 >= 1, itemsHigh 총 1개 >= 1)
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
      name: "② 무료배송 기준 초과(총액 높음, 수량 1개)",
      items: itemsHigh,
      expectInvalid: ["expired", "timeRange", "bogoQty", "bogoQty", "noEffect"],
      // expired: 만료된 쿠폰
      // timeRange: 시간대 미맞음 (13:00-17:00, 현재 12:00)
      // bogoQty: buyQuantity 3 > 총수량 1
      // bogoQty: buyXgetY 쿠폰이지만 수량 1개로 변경했으므로 실패
      // noEffect: freeShipping이 이미 무료배송 조건 충족으로 무효과
      expectValid: 4, // rate 3장 + buyXgetY 1장 통과
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
      expect(validCoupons.size).toBe(expectValid);
      expect(invalidCoupons.size).toBe(expectInvalid.length);

      console.log(`=== ${name} ===`);
      console.log("Valid coupons:", validCoupons.size);
      console.log(
        "Invalid coupons:",
        Array.from(invalidCoupons).map((coupon) => ({
          reason: coupon.invalidReason,
        }))
      );

      // 사유 검증
      const reasons = Array.from(invalidCoupons).map(
        (coupon) => coupon.invalidReason
      );
      expectInvalid.forEach((reason) => expect(reasons).toContain(reason));
    });
  });
});
