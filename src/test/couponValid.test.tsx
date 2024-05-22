import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { describe, it, vi, beforeAll, afterAll, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { chargeShippingDummy, couponsDummy } from "@/mock/dummy";
import { cartState, couponsState, couponEachCheckState } from "@/store/atom/atoms";

import useCoupon from "@/hooks/useCoupon";

export const couponEachCheckDummy = [
  { id: 1, isCheck: true },
  { id: 2, isCheck: false },
  { id: 3, isCheck: true },
  { id: 4, isCheck: false },
  { id: 5, isCheck: false },
  { id: 6, isCheck: false },
];

const ReactRootComponent = ({ children }: PropsWithChildren) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(cartState, chargeShippingDummy.content);
      set(couponsState, couponsDummy);
      couponEachCheckDummy.forEach(({ id, isCheck }) => {
        set(couponEachCheckState(id), isCheck);
      });
    }}
  >
    {children}
  </RecoilRoot>
);

describe("coupon disable 테스트", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2024-05-20"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("체크된 쿠폰이 2개 이상인 경우, 체크되지 않은 쿠폰은 비활성화여야 한다.", () => {
    const { result } = renderHook(
      () => {
        const id = 5;
        const { isDisabled } = useCoupon(id);
        return { isDisabled };
      },
      {
        wrapper: ReactRootComponent,
      }
    );

    expect(result.current.isDisabled).toBeTruthy();
  });

  it("모든 기준을 충족하는 활성화여야 한다.", () => {
    const { result } = renderHook(
      () => {
        const id = 3;
        const { isDisabled } = useCoupon(id);
        return { isDisabled };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, chargeShippingDummy.content);
              set(couponsState, couponsDummy);
              couponEachCheckDummy.forEach(({ id }) => {
                set(couponEachCheckState(id), false);
              });
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );
    expect(result.current.isDisabled).toBeFalsy();
  });

  it("'2개 구매 시 1개 무료 쿠폰'의 경우, 장바구니에 2개 이상의 상품이 담겨 있다면 활성화 된다.", () => {
    const CART_STATE: CartItemInfo[] = [
      {
        id: 1,
        product: {
          id: 100,
          name: "abc",
          price: 20000,
          imageUrl: "",
          category: "fashion",
        },
        quantity: 1,
      },
    ];
    const { result } = renderHook(
      () => {
        const BOGO_ID = 5;
        const { isDisabled } = useCoupon(BOGO_ID);
        return { isDisabled };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, CART_STATE);
              set(couponsState, couponsDummy);
              couponEachCheckDummy.forEach(({ id }) => {
                set(couponEachCheckState(id), false);
              });
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );
    expect(result.current.isDisabled).toBeFalsy();
  });

  it("유효기간을 넘으면 비활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const OVERDUE_ID = 2;
        const { isDisabled } = useCoupon(OVERDUE_ID);
        return { isDisabled };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, chargeShippingDummy.content);
              set(couponsState, couponsDummy);
              couponEachCheckDummy.forEach(({ id }) => {
                set(couponEachCheckState(id), false);
              });
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );
    expect(result.current.isDisabled).toBeTruthy();
  });

  it("최소 주문 금액이 넘으면 활성화된다.", () => {
    const { result } = renderHook(
      () => {
        const id = 6;
        const { isDisabled } = useCoupon(id);
        return { isDisabled };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, chargeShippingDummy.content);
              set(couponsState, couponsDummy);
              couponEachCheckDummy.forEach(({ id }) => {
                set(couponEachCheckState(id), false);
              });
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );
    expect(result.current.isDisabled).toBeFalsy();
  });
  it("사용 시간에 해당하면 활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const id = 4;
        const { isDisabled } = useCoupon(id);
        return { isDisabled };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(cartState, chargeShippingDummy.content);
              set(couponsState, couponsDummy);
              couponEachCheckDummy.forEach(({ id }) => {
                set(couponEachCheckState(id), false);
              });
            }}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );
    expect(result.current.isDisabled).toBeFalsy();
  });
});
