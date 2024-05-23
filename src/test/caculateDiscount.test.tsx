import useCouponCalculate from "@/hooks/useCouponCalculate";
import { cartItemDummy } from "@/mock/dummy";
import { cartState } from "@/store/atom/atoms";
import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { describe, it, vi, beforeAll, afterAll, expect } from "vitest";

const COUPONS: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30",
    discount: 5000,
    minimumAmount: 20000,
    discountType: "fixed",
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
    vi.setSystemTime(new Date("2024-05-20T06:00:00Z"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });
  it.each([
    {
      CART_STATE_DUMMY: [
        { product: { id: 100, price: 20000 }, quantity: 2 },
        { product: { id: 102, price: 40000 }, quantity: 2 },
      ].map(({ product, quantity }) => ({
        ...cartItemDummy,
        product: { ...cartItemDummy.product, ...product },
        quantity,
      })),
      DISCOUNT_AMOUNT_EXPECTED: 41_000,
    },
    {
      CART_STATE_DUMMY: [
        { product: { id: 100, price: 40000 }, quantity: 2 },
        { product: { id: 102, price: 40000 }, quantity: 7 },
        { product: { id: 105, price: 10000 }, quantity: 1 },
      ].map(({ product, quantity }) => ({
        ...cartItemDummy,
        product: { ...cartItemDummy.product, ...product },
        quantity,
      })),
      DISCOUNT_AMOUNT_EXPECTED: 116_000,
    },
    {
      CART_STATE_DUMMY: [{ product: { id: 100, price: 20000 }, quantity: 1 }].map(({ product, quantity }) => ({
        ...cartItemDummy,
        product: { ...cartItemDummy.product, ...product },
        quantity,
      })),
      DISCOUNT_AMOUNT_EXPECTED: 11_000,
    },
    {
      CART_STATE_DUMMY: [{ product: { id: 100, price: 10000 }, quantity: 1 }].map(({ product, quantity }) => ({
        ...cartItemDummy,
        product: { ...cartItemDummy.product, ...product },
        quantity,
      })),
      DISCOUNT_AMOUNT_EXPECTED: 3_000,
    },
  ])(
    "percent할인 쿠폰과 fixed할인 쿠폰이 같이 적용된다면, percent 쿠폰 우선 적용한다.",
    ({ CART_STATE_DUMMY, DISCOUNT_AMOUNT_EXPECTED }) => {
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
    }
  );
});
