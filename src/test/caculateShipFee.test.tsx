import { SHIPPING_CONSTANT } from "@/constants";
import useCouponCalculate from "@/hooks/useCouponCalculate";
import { cartState, isExtraShippingFeeState } from "@/store/atom/atoms";
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { describe, expect, it, vi, beforeAll, afterAll } from "vitest";
import { makeCartStateDummy } from "./testUtils";

const COUPONS: Coupon[] = [
  {
    id: 5,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2024-05-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31",
    minimumAmount: 40000,
    discountType: "freeShipping",
  },
];

describe("무료 배송 쿠폰 계산 테스트", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-20T06:00:00"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  const CART_STATE_OVER_FREE_CRITERIA = makeCartStateDummy([
    { product: { id: 100, price: 20000 }, quantity: 2 },
    { product: { id: 102, price: 40000 }, quantity: 2 },
  ]);

  const CART_STATE_NOT_OVER_FREE_CRITERIA_BUT_OVER_MINIMUM = makeCartStateDummy([
    { product: { id: 100, price: 40000 }, quantity: 2 },
    { product: { id: 105, price: 10000 }, quantity: 1 },
  ]);

  const CART_STATE_CHARGE_EXTRA_SHIP_FEE = makeCartStateDummy([
    { product: { id: 100, price: 40000 }, quantity: 2 },
    { product: { id: 105, price: 10000 }, quantity: 1 },
  ]);

  it.each([
    {
      DESCRIPTION: `${SHIPPING_CONSTANT.FREE_CRITERIA}만원이 넘는 경우, 배송비가 무료이므로 쿠폰이 적용되지 않는다.`,
      CART_STATE_DUMMY: CART_STATE_OVER_FREE_CRITERIA,
      DISCOUNT_AMOUNT_EXPECTED: 40_000,
    },
    {
      DESCRIPTION: `${SHIPPING_CONSTANT.FREE_CRITERIA}만원이 넘지 않고, 쿠폰 최소 주문 금액이 넘으면 배송비 할인이 적용된다.`,
      CART_STATE_DUMMY: CART_STATE_NOT_OVER_FREE_CRITERIA_BUT_OVER_MINIMUM,
      DISCOUNT_AMOUNT_EXPECTED: 40_000 + SHIPPING_CONSTANT.FEE,
    },
    {
      DESCRIPTION: "도서산간 지역의 경우 도서 산간에 대한 금액이 할인된다.",
      CART_STATE_DUMMY: CART_STATE_CHARGE_EXTRA_SHIP_FEE,
      DISCOUNT_AMOUNT_EXPECTED: 40_000 + SHIPPING_CONSTANT.FEE + SHIPPING_CONSTANT.EXTRA_FEE,
      isExtraFee: true,
    },
  ])(`$DESCRIPTION`, ({ CART_STATE_DUMMY, DISCOUNT_AMOUNT_EXPECTED, isExtraFee }) => {
    const { result } = renderHook(
      () => {
        return useCouponCalculate(COUPONS);
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, CART_STATE_DUMMY);
              if (isExtraFee) set(isExtraShippingFeeState, true);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );

    expect(result.current.discountAmount).toBe(DISCOUNT_AMOUNT_EXPECTED);
  });

  it.each([
    {
      DESCRIPTION: `${SHIPPING_CONSTANT.FREE_CRITERIA}만원이 넘는 경우, 배송비가 무료이므로 쿠폰이 적용되지 않는다.`,
      CART_STATE_DUMMY: CART_STATE_OVER_FREE_CRITERIA,
      DISCOUNT_AMOUNT_EXPECTED: 40_000,
    },
    {
      DESCRIPTION: `${SHIPPING_CONSTANT.FREE_CRITERIA}만원이 넘지 않고, 쿠폰 최소 주문 금액이 넘으면 배송비 할인이 적용된다.`,
      CART_STATE_DUMMY: CART_STATE_NOT_OVER_FREE_CRITERIA_BUT_OVER_MINIMUM,
      DISCOUNT_AMOUNT_EXPECTED: 40_000 + SHIPPING_CONSTANT.FEE,
    },
    {
      DESCRIPTION: "도서산간 지역의 경우 도서 산간에 대한 금액이 할인된다.",
      CART_STATE_DUMMY: CART_STATE_CHARGE_EXTRA_SHIP_FEE,
      DISCOUNT_AMOUNT_EXPECTED: 40_000 + SHIPPING_CONSTANT.FEE + SHIPPING_CONSTANT.EXTRA_FEE,
      isExtraFee: true,
    },
  ])(`$DESCRIPTION`, ({ CART_STATE_DUMMY, DISCOUNT_AMOUNT_EXPECTED, isExtraFee }) => {
    const { result } = renderHook(
      () => {
        return useCouponCalculate(COUPONS);
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, CART_STATE_DUMMY);
              if (isExtraFee) set(isExtraShippingFeeState, true);
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );

    expect(result.current.discountAmount).toBe(DISCOUNT_AMOUNT_EXPECTED);
  });
});
