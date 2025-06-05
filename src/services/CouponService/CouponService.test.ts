import { CART_ITEMS_DATA, COUPON_DATA } from "@/mocks/datas";
import { Coupon } from "@/types";
import { CouponService } from "..";

describe("CouponService", () => {
  let couponService: CouponService;

  beforeEach(() => {
    couponService = new CouponService(CART_ITEMS_DATA.content);
  });

  describe("canAdjustCoupon", () => {
    describe("FIXED5000 쿠폰", () => {
      it("총 주문 금액이 minimumAmount 이상이라면 적용할 수 있다.", () => {
        expect(couponService.canAdjustCoupon({ ...COUPON_DATA[0], minimumAmount: 50_000 } as Coupon)).toBeTruthy();
      });
      it("총 주문 금액이 minimumAmount 미만이라면 적용할 수 없다.", () => {
        expect(couponService.canAdjustCoupon({ ...COUPON_DATA[0], minimumAmount: 100_000 } as Coupon)).toBeFalsy();
      });
    });

    describe("BOGO 쿠폰", () => {
      it("한 제품을 buyQuantity개 이상 구매 시 적용할 수 있다.", () => {
        expect(
          couponService.canAdjustCoupon({ ...COUPON_DATA[1], buyQuantity: 2, getQuantity: 1 } as Coupon),
        ).toBeTruthy();
        expect(
          couponService.canAdjustCoupon({ ...COUPON_DATA[1], buyQuantity: 3, getQuantity: 1 } as Coupon),
        ).toBeTruthy();
      });
      it("한 제품을 buyQuantity개 미만 구매 시 적용할 수 없다.", () => {
        expect(
          couponService.canAdjustCoupon({ ...COUPON_DATA[1], buyQuantity: 4, getQuantity: 1 } as Coupon),
        ).toBeFalsy();
      });
    });

    describe("FREESHIPPING 쿠폰", () => {
      it("총 주문 금액이 minimumAmount 이상이라면 적용할 수 있다.", () => {
        expect(couponService.canAdjustCoupon({ ...COUPON_DATA[2], minimumAmount: 50_000 } as Coupon)).toBeTruthy();
      });
      it("총 주문 금액이 minimumAmount 미만이라면 적용할 수 없다.", () => {
        expect(couponService.canAdjustCoupon({ ...COUPON_DATA[2], minimumAmount: 100_000 } as Coupon)).toBeFalsy();
      });
    });

    describe("MIRACLESALE 쿠폰", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it("현재 시간이 availableTime 이내라면 적용할 수 있다.", () => {
        jest.setSystemTime(new Date("2024-01-01T05:00:00"));

        expect(
          couponService.canAdjustCoupon({
            ...COUPON_DATA[3],
            availableTime: { start: "04:00:00", end: "07:00:00" },
          } as Coupon),
        ).toBeTruthy();
      });

      it("현재 시간이 availableTime 이내가 아니라면 적용할 수 없다.", () => {
        jest.setSystemTime(new Date("2024-01-01T08:00:00"));

        expect(
          couponService.canAdjustCoupon({
            ...COUPON_DATA[3],
            availableTime: { start: "04:00:00", end: "07:00:00" },
          } as Coupon),
        ).toBeFalsy();
      });
    });
  });

  describe("calculateDiscountPrice", () => {
    describe("FIXED5000 쿠폰", () => {
      it("5,000원의 할인 금액을 반환한다.", () => {
        expect(couponService.calculateDiscountPrice(COUPON_DATA[0], false)).toBe(5_000);
      });
    });

    describe("BOGO 쿠폰", () => {
      it("2개 이상 구매한 제품이 2개 이상 있다면 더 비싼 제품을 무료로 제공한다.", () => {
        expect(couponService.calculateDiscountPrice(COUPON_DATA[1], false)).toBe(30_000);
      });
    });

    describe("FREESHIPPING 쿠폰", () => {
      it("제주도 및 도서 산간 지역이 아니라면 3,000원의 할인 금액을 반환한다.", () => {
        expect(couponService.calculateDiscountPrice(COUPON_DATA[2], false)).toBe(3_000);
      });
      it("제주도 및 도서 산간 지역이라면 6,000원의 할인 금액을 반환한다.", () => {
        expect(couponService.calculateDiscountPrice(COUPON_DATA[2], true)).toBe(6_000);
      });
    });

    describe("MIRACLESALE 쿠폰", () => {
      it("30%의 할인 금액을 반환한다.", () => {
        expect(couponService.calculateDiscountPrice(COUPON_DATA[3], false)).toBe(22_500);
      });
    });
  });

  describe("calculateTotalDiscountPrice", () => {
    it("총 할인 금액을 반환한다.", () => {
      expect(CouponService.calculateTotalDiscountPrice(CART_ITEMS_DATA.content, COUPON_DATA.slice(1, 3), false)).toBe(
        33_000,
      );
    });
  });

  describe("calculateMostDiscountCombination", () => {
    it("가장 할인 금액이 높은 쿠폰 2개를 반환한다.", () => {
      expect(
        CouponService.calculateMostDiscountCombination(CART_ITEMS_DATA.content, COUPON_DATA, false).map(
          (coupon) => coupon.id,
        ),
      ).toEqual([2, 4]);
    });
  });
});
