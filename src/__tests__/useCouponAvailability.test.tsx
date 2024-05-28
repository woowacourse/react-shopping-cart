import { act } from "react";
import { waitFor } from "@testing-library/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { cartItemQuantity } from "@/recoil/cartItemQuantity";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";

import useCouponAvailability from "../hooks/useCouponAvailability";
import { renderTestHook } from "./utils/renderTestHook";

import TEST_COUPONS from "./mocks/coupon";
import MOCK_CART_ITEMS from "./mocks/cartItem";
import { COUPON_VALIDATION_MESSAGES } from "@/constants/cart";

jest.mock("../apis/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe("useCouponAvailability", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-20"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("쿠폰 존재 여부 판단", () => {
    it("존재하지 않는 쿠폰을 사용하려고 경우 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(2),
        [TEST_COUPONS.usableFixedDiscountCoupon]
      );

      expect(result.current.checkCouponUsable()).toBe(
        COUPON_VALIDATION_MESSAGES.unusableCoupon
      );
    });

    it("존재하는 쿠폰이고 사용 조건을 만족할 경우, 사용할 수 있는 쿠폰임을 반환해야 한다.", () => {
      const { result } = renderTestHook(() => {
        const { checkCouponUsable } = useCouponAvailability(1);
        const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

        return { checkCouponUsable, totalOrderPrice };
      }, [TEST_COUPONS.usableFixedDiscountCoupon]);

      const MOCK_DATA_TOTAL_ORDER_PRICE = MOCK_CART_ITEMS.reduce(
        (accPrice, currItem) =>
          accPrice + currItem.product.price * currItem.quantity,
        0
      );

      expect(result.current.totalOrderPrice).toBe(MOCK_DATA_TOTAL_ORDER_PRICE);
      expect(result.current.checkCouponUsable()).toBe("");
    });
  });

  describe("쿠폰 유효 기간 판단", () => {
    it("유효 기간이 지난 쿠폰인 경우, 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.invalidExpirationCoupon]
      );

      expect(result.current.checkCouponUsable()).toBe(
        COUPON_VALIDATION_MESSAGES.unusableCoupon
      );
    });

    it("유효 기간이 지나지 않고 사용 조건을 만족하는 쿠폰인 경우, 사용할 수 있는 쿠폰임을 반환해야 한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.validExpirationCoupon]
      );

      expect(result.current.checkCouponUsable()).toBe("");
    });
  });

  describe("최소 주문 금액 쿠폰", () => {
    it("최소 주문 금액을 만족하지 못하는 경우, 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.unusableFixedDiscountCoupon]
      );

      const minimumAmount =
        TEST_COUPONS.unusableFixedDiscountCoupon.minimumAmount;

      if (minimumAmount) {
        expect(result.current.checkCouponUsable()).toBe(
          COUPON_VALIDATION_MESSAGES.invalidMinimumAmountCoupon(minimumAmount)
        );
      }
    });

    it("최소 주문 금액을 만족하는 경우, 사용할 수 있는 쿠폰임을 반환해야 한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.usableFixedDiscountCoupon]
      );

      expect(result.current.checkCouponUsable()).toBe("");
    });
  });

  describe("쿠폰 사용 시간 판단", () => {
    it("현재 시간이 쿠폰을 사용할 수 있는 시간 전인 경우, 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      jest.setSystemTime(new Date("2024-05-20T03:59:59"));

      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.usablePercentageDiscountCoupon]
      );

      const couponAvailableTime =
        TEST_COUPONS.usablePercentageDiscountCoupon.availableTime;

      if (couponAvailableTime) {
        expect(result.current.checkCouponUsable()).toBe(
          COUPON_VALIDATION_MESSAGES.invalidTimeCoupon(couponAvailableTime)
        );
      }
    });

    it("현재 시간이 쿠폰을 사용할 수 있는 시간을 지난 경우, 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      jest.setSystemTime(new Date("2024-05-20T07:00:01"));

      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.usablePercentageDiscountCoupon]
      );

      const couponAvailableTime =
        TEST_COUPONS.usablePercentageDiscountCoupon.availableTime;

      if (couponAvailableTime) {
        expect(result.current.checkCouponUsable()).toBe(
          COUPON_VALIDATION_MESSAGES.invalidTimeCoupon(couponAvailableTime)
        );
      }
    });
  });

  describe("x개 사면 y개 무료 쿠폰", () => {
    it("x개를 초과해서 구매할 상품이 없는 경우, 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.usableBuyXGetYCoupon]
      );

      const buyXQuantity = TEST_COUPONS.usableBuyXGetYCoupon.buyQuantity;

      if (buyXQuantity) {
        expect(result.current.checkCouponUsable()).toBe(
          COUPON_VALIDATION_MESSAGES.invalidQuantityCoupon(buyXQuantity)
        );
      }
    });

    it("x개를 초과해서 구매할 상품이 있는 경우, 사용할 수 있는 쿠폰임을 반환해야 한다.", async () => {
      const { result } = renderTestHook(() => {
        const setCartItemCount = useSetRecoilState(
          cartItemQuantity(MOCK_CART_ITEMS[0].id)
        );
        const { checkCouponUsable } = useCouponAvailability(1);

        return { setCartItemCount, checkCouponUsable };
      }, [TEST_COUPONS.usableBuyXGetYCoupon]);

      const buyXQuantity = TEST_COUPONS.usableBuyXGetYCoupon.buyQuantity;

      if (buyXQuantity) {
        expect(result.current.checkCouponUsable()).toBe(
          COUPON_VALIDATION_MESSAGES.invalidQuantityCoupon(buyXQuantity)
        );
      }

      act(() => {
        result.current.setCartItemCount(3); // 가격이 10_000인 상품의 수량을 3으로 변경한다
      });

      await waitFor(() => {
        expect(result.current.checkCouponUsable()).toBe("");
      });
    });
  });

  describe("배송비 쿠폰", () => {
    it("최소 주문 금액을 만족하지 못하는 경우, 사용할 수 없는 이유에 대한 메시지를 반환한다.", () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.unusableFreeShippingCoupon]
      );

      const minimumAmount =
        TEST_COUPONS.unusableFreeShippingCoupon.minimumAmount;

      if (minimumAmount) {
        expect(result.current.checkCouponUsable()).toBe(
          COUPON_VALIDATION_MESSAGES.invalidMinimumAmountCoupon(minimumAmount)
        );
      }
    });

    it("최소 주문 금액을 만족하는 경우, 사용할 수 있는 쿠폰임을 반환해야 한다.", async () => {
      const { result } = renderTestHook(
        () => useCouponAvailability(1),
        [TEST_COUPONS.usableFreeShippingCoupon]
      );

      expect(result.current.checkCouponUsable()).toBe("");
    });
  });
});
