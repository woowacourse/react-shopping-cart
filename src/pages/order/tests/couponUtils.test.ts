import { describe, it, expect } from "vitest";
import createTodayTime from "../utils/coupon/createTodayTime";
import formatTime from "../utils/coupon/formatTime";
import validation from "../utils/coupon/validation";
import MOCKING_COUPONS_DATA from "../../../shared/apis/mocks/data/coupons.json";
import type { CouponResponse } from "../../../shared/types/coupon";

const mockCoupons = MOCKING_COUPONS_DATA as CouponResponse[];

describe("쿠폰 관련 유틸리티 테스트", () => {
  describe("createTodayTime 테스트", () => {
    it("시간 문자열을 Date 객체로 변환한다", () => {
      const time = "14:30:00";
      const result = createTodayTime(time);
      const expected = new Date();
      expected.setHours(14, 30, 0, 0);

      expect(result.getHours()).toBe(expected.getHours());
      expect(result.getMinutes()).toBe(expected.getMinutes());
      expect(result.getSeconds()).toBe(expected.getSeconds());
    });
  });

  describe("formatTime 테스트", () => {
    it("시간을 오전/오후 형식으로 포맷팅한다.", () => {
      const time = "14:30:00";
      const result = formatTime(time);

      expect(result).toBe("오후 2시");
    });
  });

  describe("validation 테스트", () => {
    const validCoupon = mockCoupons[0]; // FIXED5000 쿠폰
    const bogoCoupon = mockCoupons[1]; // BOGO 쿠폰
    const miracleCoupon = mockCoupons[3]; // MIRACLESALE 쿠폰

    it("유효한 쿠폰을 검증한다", () => {
      const isValid =
        validation.expirationDate(validCoupon.expirationDate) &&
        validation.minimumAmount(150000, validCoupon.minimumAmount ?? null);

      expect(isValid).toBe(true);
    });

    it("최소 주문 금액 미만일 때 쿠폰 사용을 제한한다", () => {
      const isValid = validation.minimumAmount(50000, validCoupon.minimumAmount ?? null);
      expect(isValid).toBe(false);
    });

    it("만료된 쿠폰은 사용할 수 없다", () => {
      const expiredCoupon = { ...validCoupon, expirationDate: "2024-02-29" };
      const isValid = validation.expirationDate(expiredCoupon.expirationDate);
      expect(isValid).toBe(false);
    });

    it("사용 가능 시간이 아닐 때 쿠폰 사용을 제한한다", () => {
      const isValid = validation.availableTime(
        miracleCoupon.availableTime?.start ?? null,
        miracleCoupon.availableTime?.end ?? null,
      );

      const now = new Date();
      const hour = now.getHours();
      expect(isValid).toBe(hour >= 4 && hour <= 7);
    });

    it("buyXgetY 쿠폰의 수량 조건을 검증한다", () => {
      const isValid = validation.buyQuantity(3, bogoCoupon.buyQuantity ?? null, bogoCoupon.getQuantity ?? null);
      expect(isValid).toBe(true);
    });

    it("buyXgetY 쿠폰의 수량 조건을 충족하지 못하면 사용할 수 없다", () => {
      const isValid = validation.buyQuantity(1, bogoCoupon.buyQuantity ?? null, bogoCoupon.getQuantity ?? null);
      expect(isValid).toBe(false);
    });
  });
});
