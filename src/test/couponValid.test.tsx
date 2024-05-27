import { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";
import { describe, it, vi, beforeAll, afterAll, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { chargeShippingDummy, couponsDummy, freeShippingDummy } from "@/mock/testMockData";
import { cartState, couponsState, couponEachCheckState } from "@/store/atom/atoms";

import useCoupon from "@/hooks/useCoupon";

const twoCouponsCheckedDummy = [
  { id: 1, isCheck: true },
  { id: 2, isCheck: false },
  { id: 3, isCheck: true },
  { id: 4, isCheck: false },
  { id: 5, isCheck: false },
  { id: 6, isCheck: false },
];

const NoCouponsCheckedDummy = [
  { id: 1, isCheck: false },
  { id: 2, isCheck: false },
  { id: 3, isCheck: false },
  { id: 4, isCheck: false },
  { id: 5, isCheck: false },
  { id: 6, isCheck: false },
];

interface RecoilRootComponent extends PropsWithChildren {
  checkDummy: { id: number; isCheck: boolean }[];
  cartDummy: { content: CartItemInfo[] };
}

const ReactRootComponent = ({ children, checkDummy, cartDummy }: RecoilRootComponent) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(cartState, cartDummy.content);
      set(couponsState, couponsDummy);
      checkDummy.forEach(({ id, isCheck }) => {
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
    vi.setSystemTime(new Date("2024-05-20T06:00:00"));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it("체크된 쿠폰이 2개 이상인 경우, 체크되지 않은 쿠폰은 비활성화여야 한다.", () => {
    const { result } = renderHook(
      () => {
        const id = 5;
        const { disabled } = useCoupon(id);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={twoCouponsCheckedDummy} cartDummy={chargeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );

    expect(result.current.disabled).toBeTruthy();
  });

  it("모든 기준을 충족하는 활성화여야 한다.", () => {
    const { result } = renderHook(
      () => {
        const id = 3;
        const { disabled } = useCoupon(id);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={chargeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeFalsy();
  });

  it("'2개 구매 시 1개 무료 쿠폰'의 경우, 장바구니에 2개 이상의 상품이 담겨 있다면 활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const ID = 5;
        const { disabled } = useCoupon(ID);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={chargeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeFalsy();
  });

  it("유효기간을 넘으면 비활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const OVERDUE_ID = 2;
        const { disabled } = useCoupon(OVERDUE_ID);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={chargeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeTruthy();
  });

  it("최소 주문 금액이 넘으면 활성화된다.", () => {
    const { result } = renderHook(
      () => {
        const id = 6;
        const { disabled } = useCoupon(id);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={freeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeFalsy();
  });

  it("사용 시간에 해당하면 활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const id = 4;
        const { disabled } = useCoupon(id);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={chargeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeFalsy();
  });

  it("결제 금액이 10만원이 넘는 경우(배송비가 청구되는 않는 경우), 배송비 무료 쿠폰이 비활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const id = 3;
        const { disabled } = useCoupon(id);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={freeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeTruthy();
  });

  it("결제 금액이 최소금액을 넘지 않는 경우, 배송비 무료 쿠폰이 비활성화 된다.", () => {
    const { result } = renderHook(
      () => {
        const id = 3;
        const { disabled } = useCoupon(id);
        return { disabled };
      },
      {
        wrapper: ({ children }) => (
          <ReactRootComponent checkDummy={NoCouponsCheckedDummy} cartDummy={chargeShippingDummy}>
            {children}
          </ReactRootComponent>
        ),
      }
    );
    expect(result.current.disabled).toBeFalsy();
  });
});
