import useCouponCalculate from "@/hooks/useCouponCalculate";
import { cartState } from "@/store/atom/atoms";
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { describe, it, vi, beforeAll, afterAll, expect } from "vitest";
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
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2024-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

describe("percent 할인 쿠폰과 fixed 할인 쿠폰 계산 테스트", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-20T06:00:00"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  const CART_STATE_COMPARE_PRICE_1 = makeCartStateDummy([
    { product: { id: 100, price: 20000 }, quantity: 2 },
    { product: { id: 102, price: 40000 }, quantity: 2 },
  ]);

  const CART_STATE_COMPARE_PRICE_2 = makeCartStateDummy([
    { product: { id: 100, price: 40000 }, quantity: 2 },
    { product: { id: 102, price: 30000 }, quantity: 7 },
    { product: { id: 105, price: 10000 }, quantity: 1 },
  ]);

  const CART_STATE_CHECK_NOT_DISCOUNT = makeCartStateDummy([{ product: { id: 100, price: 20000 }, quantity: 1 }]);

  it.each([
    {
      DESCRIPTION: "가격이 큰 제품을 증정한다.",
      CART_STATE_DUMMY: CART_STATE_COMPARE_PRICE_1,
      DISCOUNT_AMOUNT_EXPECTED: 76_000,
    },
    {
      DESCRIPTION: "가격이 큰 제품을 증정한다.",
      CART_STATE_DUMMY: CART_STATE_COMPARE_PRICE_2,
      DISCOUNT_AMOUNT_EXPECTED: 130_000,
    },
    {
      DESCRIPTION: "수량이 2개 이상인 제품이 없으면 할인되지 않는다.",
      CART_STATE_DUMMY: CART_STATE_CHECK_NOT_DISCOUNT,
      DISCOUNT_AMOUNT_EXPECTED: 6_000,
    },
  ])("$DESCRIPTION", ({ CART_STATE_DUMMY, DISCOUNT_AMOUNT_EXPECTED }) => {
    const { result } = renderHook(
      () => {
        return useCouponCalculate(COUPONS);
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, CART_STATE_DUMMY);
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
