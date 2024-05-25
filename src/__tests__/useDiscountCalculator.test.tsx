import { act } from "react";
import { waitFor } from "@testing-library/react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { cartItemQuantity } from "@/recoil/cartItemQuantity";
import { couponsState } from "@/recoil/coupon";
import { remoteAreaState, shippingFeeSelector } from "@/recoil/shippingFee";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";

import { renderTestHook } from "./utils/renderTestHook";
import useDiscountCalculator from "../hooks/useDiscountCalculator";

import { CART_FEE } from "@/constants/cart";

import TEST_COUPONS from "./mocks/coupon";
import MOCK_CART_ITEMS from "./mocks/cartItem";

jest.mock("../apis/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe("useDiscountCalculator", () => {
  describe("고정 할인 금액", () => {
    it("할인을 적용할 수 있는 경우, 고정 금액을 반환한다.", () => {
      const { result } = renderTestHook(() => {
        const { getDiscountAmount } = useDiscountCalculator();
        const coupons = useRecoilValue(couponsState);

        return { getDiscountAmount, coupons };
      }, [TEST_COUPONS.usableFixedDiscountCoupon]);

      const { getDiscountAmount, coupons } = result.current;

      expect(getDiscountAmount(coupons[0])).toBe(coupons[0].discount);
    });
  });

  describe("percentage 할인 금액", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2024-05-20T05:30:00")); // 쿠폰이 적용 가능한 시간으로 모킹 시간을 설정한다.
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it("쿠폰의 percentage에 해당하는 할인 금액을 반환한다.", () => {
      const { result } = renderTestHook(() => {
        const { getDiscountAmount } = useDiscountCalculator();
        const coupons = useRecoilValue(couponsState);
        const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

        return { getDiscountAmount, coupons, totalOrderPrice };
      }, [TEST_COUPONS.usablePercentageDiscountCoupon]);

      const EXPECTED_TOTAL_ORDER_PRICE = 80_000;
      const EXPECTED_DISCOUNT_AMOUNT = 24_000;

      const { getDiscountAmount, coupons } = result.current;

      expect(result.current.totalOrderPrice).toBe(EXPECTED_TOTAL_ORDER_PRICE);
      expect(getDiscountAmount(coupons[0])).toBe(EXPECTED_DISCOUNT_AMOUNT);
    });
  });

  describe("x개 사면 y개 무료", () => {
    it("상품 가격 * getQuantity만큼의 할인 금액을 반환한다.", async () => {
      const { result } = renderTestHook(() => {
        const setCartItemCount = useSetRecoilState(
          cartItemQuantity(MOCK_CART_ITEMS[0].id)
        );
        const { getDiscountAmount } = useDiscountCalculator();
        const coupons = useRecoilValue(couponsState);

        return { coupons, setCartItemCount, getDiscountAmount };
      }, [TEST_COUPONS.usableBuyXGetYCoupon]);

      act(() => {
        result.current.setCartItemCount(3);
      });

      await waitFor(() => {
        const { getDiscountAmount, coupons } = result.current;

        expect(getDiscountAmount(coupons[0])).toBe(
          MOCK_CART_ITEMS[0].product.price * (coupons[0].getQuantity as number)
        );
      });
    });

    it("할인을 적용할 수 있는 상품이 여러개인 경우, 가장 비싼 상품 * getQuantity만큼의 할인 금액을 반환한다.", async () => {
      const { result } = renderTestHook(() => {
        const setFirstCartItemCount = useSetRecoilState(
          cartItemQuantity(MOCK_CART_ITEMS[0].id)
        );
        const setSecondCartItemCount = useSetRecoilState(
          cartItemQuantity(MOCK_CART_ITEMS[1].id)
        );
        const { getDiscountAmount } = useDiscountCalculator();
        const coupons = useRecoilValue(couponsState);

        return {
          coupons,
          setFirstCartItemCount,
          setSecondCartItemCount,
          getDiscountAmount,
        };
      }, [TEST_COUPONS.usableBuyXGetYCoupon]);

      act(() => {
        result.current.setFirstCartItemCount(3);
        result.current.setSecondCartItemCount(3);
      });

      await waitFor(() => {
        const { getDiscountAmount, coupons } = result.current;
        expect(getDiscountAmount(coupons[0])).toBe(
          Math.max(
            MOCK_CART_ITEMS[0].product.price,
            MOCK_CART_ITEMS[1].product.price
          ) * (coupons[0].getQuantity as number)
        );
      });
    });
  });

  describe("배송비 무료 쿠폰", () => {
    it("배송비 쿠폰을 사용할 수 있는 경우, 사용하면 배송비를 할인받을 수 있어야 한다.", async () => {
      const { result } = renderTestHook(() => {
        const { getDiscountAmount } = useDiscountCalculator();
        const coupons = useRecoilValue(couponsState);

        return { coupons, getDiscountAmount };
      }, [TEST_COUPONS.usableFreeShippingCoupon]);

      const { getDiscountAmount, coupons } = result.current;

      expect(getDiscountAmount(coupons[0])).toBe(CART_FEE.shippingFee);
    });

    it("제주도 및 도서 산간 지역 거주 사용자여도, 배송비 쿠폰을 사용할 수 있는 경우 모든 배송비를 할인받을 수 있어야 한다.", async () => {
      const { result } = renderTestHook(() => {
        const { getDiscountAmount } = useDiscountCalculator();
        const setIsRemoteArea = useSetRecoilState(remoteAreaState);
        const coupons = useRecoilValue(couponsState);
        const shippingFee = useRecoilValue(shippingFeeSelector);

        return {
          coupons,
          shippingFee,
          setIsRemoteArea,
          getDiscountAmount,
        };
      }, [TEST_COUPONS.usableFreeShippingCoupon]);

      act(() => {
        result.current.setIsRemoteArea(true);
      });

      await waitFor(() => {
        const { getDiscountAmount, shippingFee, coupons } = result.current;

        expect(shippingFee).toBe(
          CART_FEE.shippingFee + CART_FEE.remoteAreaShippingFee
        );

        expect(getDiscountAmount(coupons[0])).toBe(shippingFee);
      });
    });
  });
});
