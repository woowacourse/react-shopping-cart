import { CART_ITEMS_DATA, COUPON_DATA } from "@/mocks/datas";
import { CouponService } from "..";

describe("CouponService", () => {
  let couponService: CouponService;

  beforeEach(() => {
    couponService = new CouponService(CART_ITEMS_DATA.content);
  });

  describe("canAdjustCoupon", () => {
    it("쿠폰을 적용할 수 있는지 확인한다.", () => {
      // 5,000원 할인 쿠폰
      expect(couponService.canAdjustCoupon(COUPON_DATA[0])).toBeFalsy();
      // 2개 구매 시 1개 무료 쿠폰
      expect(couponService.canAdjustCoupon(COUPON_DATA[1])).toBeTruthy();
      // 5만원 이상 구매 시 무료 배송 쿠폰
      expect(couponService.canAdjustCoupon(COUPON_DATA[2])).toBeTruthy();
      // 미라클모닝 30% 할인 쿠폰
      expect(couponService.canAdjustCoupon(COUPON_DATA[3])).toBeFalsy();
    });
  });

  describe("calculateDiscountPrice", () => {
    it("쿠폰을 적용한 금액을 계산한다.", () => {
      // 5,000원 할인 쿠폰
      expect(couponService.calculateDiscountPrice(COUPON_DATA[0], false)).toBe(5_000);
      // 2개 구매 시 1개 무료 쿠폰
      expect(couponService.calculateDiscountPrice(COUPON_DATA[1], false)).toBe(30_000);
      // 5만원 이상 구매 시 무료 배송 쿠폰
      expect(couponService.calculateDiscountPrice(COUPON_DATA[2], false)).toBe(3_000);
      // 5만원 이상 구매 시 무료 배송 쿠폰 (제주도 및 도서 산간 지역)
      expect(couponService.calculateDiscountPrice(COUPON_DATA[2], true)).toBe(6_000);
      // 미라클모닝 30% 할인 쿠폰
      // 75,000 * 0.3 = 22,500
      expect(couponService.calculateDiscountPrice(COUPON_DATA[3], false)).toBe(22_500);
    });
  });
});
