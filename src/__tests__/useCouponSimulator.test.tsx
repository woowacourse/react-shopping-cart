import { act } from "react";
import { waitFor } from "@testing-library/react";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { couponsState, selectedCouponState } from "@/recoil/coupon";
import { remoteAreaState, shippingFeeSelector } from "@/recoil/shippingFee";
import { cartItemQuantity } from "@/recoil/cartItemQuantity";
import { totalOrderPriceSelector } from "@/recoil/orderInformation";

import useCouponSimulator from "../hooks/useCouponSimulator";

import { renderTestHook } from "./utils/renderTestHook";

import TEST_COUPONS from "./mocks/coupon";
import MOCK_CART_ITEMS from "./mocks/cartItem";

import { CART_FEE } from "@/constants/cart";

jest.mock("../apis/index", () => ({
  config: {
    apiUrl: "http://localhost:mock",
  },
}));

describe("useCouponSimulator", () => {
  describe("초기 상태", () => {
    it("선택된 쿠폰의 초기 상태는 빈 배열이다.", () => {
      const { result } = renderTestHook(
        () => useCouponSimulator(),
        [TEST_COUPONS.usableFixedDiscountCoupon]
      );

      expect(result.current.hasTemporaryCoupons).toBe(false);
    });
  });

  describe("단일 쿠폰 적용", () => {
    describe("고정 금액 할인 쿠폰 적용", () => {
      it("고정 금액 할인 쿠폰을 추가할 경우, 고정 금액만큼 할인을 적용한다.", async () => {
        const { result } = renderTestHook(() => {
          const couponSimulator = useCouponSimulator();
          const coupons = useRecoilValue(couponsState);

          return { couponSimulator, coupons };
        }, [TEST_COUPONS.usableFixedDiscountCoupon]);

        const { handleAddTemporaryCoupon } = result.current.couponSimulator;
        const { coupons } = result.current;

        act(() => {
          handleAddTemporaryCoupon(coupons[0]);
        });

        await waitFor(() => {
          const { discountAmount, hasTemporaryCoupons, checkSelectedCoupon } =
            result.current.couponSimulator;

          expect(discountAmount).toBe(coupons[0].discount);
          expect(hasTemporaryCoupons).toBeTruthy();
          expect(checkSelectedCoupon(coupons[0].id)).toBeTruthy();
        });
      });
    });

    describe("percentage 할인 쿠폰 적용", () => {
      it("percentage 할인 쿠폰을 추가할 경우, percentage 금액 만큼의 할인을 적용한다.", async () => {
        const { result } = renderTestHook(() => {
          const couponSimulator = useCouponSimulator();
          const coupons = useRecoilValue(couponsState);
          const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

          return { couponSimulator, coupons, totalOrderPrice };
        }, [TEST_COUPONS.usablePercentageDiscountCoupon]);

        const { handleAddTemporaryCoupon } = result.current.couponSimulator;
        const { coupons } = result.current;

        act(() => {
          handleAddTemporaryCoupon(coupons[0]);
        });

        await waitFor(() => {
          const EXPECTED_TOTAL_ORDER_PRICE = 80_000;
          const EXPECTED_DISCOUNT_AMOUNT = 24_000;

          const { totalOrderPrice } = result.current;
          const { discountAmount, hasTemporaryCoupons, checkSelectedCoupon } =
            result.current.couponSimulator;

          expect(totalOrderPrice).toBe(EXPECTED_TOTAL_ORDER_PRICE);
          expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
          expect(hasTemporaryCoupons).toBeTruthy();
          expect(checkSelectedCoupon(coupons[0].id)).toBeTruthy();
        });
      });
    });

    describe("x개 사면 y개 무료 증정 쿠폰 적용", () => {
      it("x개 사면 y개 무료 쿠폰을 추가할 경우, 상품 가격 * getQuantity만큼의 할인을 적용한다.", async () => {
        const { result } = renderTestHook(() => {
          const setCartItemCount = useSetRecoilState(
            cartItemQuantity(MOCK_CART_ITEMS[0].id)
          );
          const couponSimulator = useCouponSimulator();
          const coupons = useRecoilValue(couponsState);

          return { setCartItemCount, couponSimulator, coupons };
        }, [TEST_COUPONS.usableBuyXGetYCoupon]);

        const { handleAddTemporaryCoupon } = result.current.couponSimulator;
        const { coupons } = result.current;

        act(() => {
          result.current.setCartItemCount(3);
          handleAddTemporaryCoupon(coupons[0]);
        });

        await waitFor(() => {
          const { discountAmount, hasTemporaryCoupons, checkSelectedCoupon } =
            result.current.couponSimulator;

          expect(discountAmount).toBe(
            MOCK_CART_ITEMS[0].product.price *
              (coupons[0].getQuantity as number)
          );
          expect(hasTemporaryCoupons).toBeTruthy();
          expect(checkSelectedCoupon(coupons[0].id)).toBeTruthy();
        });
      });
    });

    describe("배송비 쿠폰 적용", () => {
      it("배송비 쿠폰을 추가할 경우, 현재 배송비 만큼의 할인을 적용한다.", async () => {
        const { result } = renderTestHook(() => {
          const couponSimulator = useCouponSimulator();
          const coupons = useRecoilValue(couponsState);
          const shippingFee = useRecoilValue(shippingFeeSelector);

          return { couponSimulator, coupons, shippingFee };
        }, [TEST_COUPONS.usableFreeShippingCoupon]);

        const { handleAddTemporaryCoupon } = result.current.couponSimulator;
        const { coupons } = result.current;

        act(() => {
          handleAddTemporaryCoupon(coupons[0]);
        });

        await waitFor(() => {
          const { discountAmount, hasTemporaryCoupons, checkSelectedCoupon } =
            result.current.couponSimulator;
          const { shippingFee } = result.current;

          expect(shippingFee).toBe(CART_FEE.shippingFee);
          expect(discountAmount).toBe(shippingFee);
          expect(hasTemporaryCoupons).toBeTruthy();
          expect(checkSelectedCoupon(coupons[0].id)).toBeTruthy();
        });
      });

      it("제주도 및 도서 산간 지역 거주 사용자여도 배송비 쿠폰을 추가할 경우, 모든 배송비 만큼의 할인을 적용한다.", async () => {
        const { result } = renderTestHook(() => {
          const couponSimulator = useCouponSimulator();
          const coupons = useRecoilValue(couponsState);
          const shippingFee = useRecoilValue(shippingFeeSelector);
          const setIsRemoteArea = useSetRecoilState(remoteAreaState);

          return { couponSimulator, coupons, shippingFee, setIsRemoteArea };
        }, [TEST_COUPONS.usableFreeShippingCoupon]);

        const { handleAddTemporaryCoupon } = result.current.couponSimulator;
        const { coupons, setIsRemoteArea } = result.current;

        act(() => {
          setIsRemoteArea(true);
          handleAddTemporaryCoupon(coupons[0]);
        });

        await waitFor(() => {
          const { discountAmount, hasTemporaryCoupons, checkSelectedCoupon } =
            result.current.couponSimulator;
          const { shippingFee } = result.current;

          expect(shippingFee).toBe(
            CART_FEE.shippingFee + CART_FEE.remoteAreaShippingFee
          );
          expect(discountAmount).toBe(shippingFee);
          expect(hasTemporaryCoupons).toBeTruthy();
          expect(checkSelectedCoupon(coupons[0].id)).toBeTruthy();
        });
      });
    });
  });

  describe("여러 쿠폰 적용", () => {
    it("고정 할인, percentage 할인 쿠폰을 모두 적용하는 경우 가장 높은 할인 금액을 적용한다.", async () => {
      const { result } = renderTestHook(() => {
        const couponSimulator = useCouponSimulator();
        const coupons = useRecoilValue(couponsState);
        const selectedCoupons = useRecoilValue(selectedCouponState);
        const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

        return { couponSimulator, coupons, selectedCoupons, totalOrderPrice };
      }, [
        TEST_COUPONS.usableFixedDiscountCoupon,
        TEST_COUPONS.usablePercentageDiscountCoupon,
      ]);

      const { handleAddTemporaryCoupon } = result.current.couponSimulator;
      const { coupons } = result.current;

      act(() => {
        handleAddTemporaryCoupon(coupons[0]);
        handleAddTemporaryCoupon(coupons[1]);
      });

      await waitFor(() => {
        const EXPECTED_DISCOUNT_AMOUNT = 29_000;

        const { discountAmount } = result.current.couponSimulator;
        expect(discountAmount).toBe(EXPECTED_DISCOUNT_AMOUNT);
      });
    });

    it("3개 이상의 쿠폰을 적용하려고 하는 경우, 예외 피드백을 전달하고 상태에 반영되지 않아야 한다.", async () => {
      const alertMock = jest.spyOn(window, "alert");

      const { result } = renderTestHook(() => {
        const couponSimulator = useCouponSimulator();
        const coupons = useRecoilValue(couponsState);

        return { couponSimulator, coupons };
      }, [
        TEST_COUPONS.usableFixedDiscountCoupon,
        TEST_COUPONS.usablePercentageDiscountCoupon,
        TEST_COUPONS.usableBuyXGetYCoupon,
      ]);

      const { handleAddTemporaryCoupon, checkSelectedCoupon } =
        result.current.couponSimulator;
      const { coupons } = result.current;

      act(() => {
        handleAddTemporaryCoupon(coupons[0]);
        handleAddTemporaryCoupon(coupons[1]);
      });

      await act(async () => {
        const { handleAddTemporaryCoupon } = result.current.couponSimulator;

        handleAddTemporaryCoupon(coupons[2]);

        await waitFor(() => {
          expect(alertMock).toHaveBeenCalledWith(
            "최대 2장의 쿠폰을 사용할 수 있습니다."
          );
        });

        expect(checkSelectedCoupon(coupons[2].id)).toBeFalsy();
      });

      alertMock.mockRestore();
    });
  });

  describe("시뮬레이션 쿠폰 제출", () => {
    it("쿠폰을 적용하고 할인 금액을 확인 한 후 제출하면, atom 상태에 반영되어야 한다.", async () => {
      const { result } = renderTestHook(() => {
        const couponSimulator = useCouponSimulator();
        const coupons = useRecoilValue(couponsState);
        const selectedCoupons = useRecoilValue(selectedCouponState);

        return { couponSimulator, coupons, selectedCoupons };
      }, [TEST_COUPONS.usableFixedDiscountCoupon]);

      const { handleAddTemporaryCoupon } = result.current.couponSimulator;
      const { coupons } = result.current;

      act(() => {
        handleAddTemporaryCoupon(coupons[0]);
      });

      act(() => {
        const { onTemporaryCouponsSubmit } = result.current.couponSimulator;
        onTemporaryCouponsSubmit();
      });

      await waitFor(() => {
        const { selectedCoupons } = result.current;

        expect(selectedCoupons.length).toBe(1); // 실제 atom에 반영되는지 확인한다.
      });
    });
  });
});
