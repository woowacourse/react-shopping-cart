import { renderHook } from "@testing-library/react";
import { RecoilRoot, useRecoilValue, RecoilState } from "recoil";

import { couponsState } from "@/stores/coupons";
import { MOCK_CART_COUPONS } from "./__mocks__/coupons";
import useCouponApplicabilityChecker from "@/hooks/coupons/useCouponApplicabilityChecker";
import { cartItemsState } from "@/stores/cartItems";
import { MOCK_CART_ITEM_SELECTIONS, MOCK_CART_LIST } from "./__mocks__/cart";
import { cartItemSelectionsState } from "@/stores/cartItemSelections";

jest.mock("@/apis/cartItem", () => ({
  getCoupons: jest.fn(),
}));

jest.mock("@/apis/coupon", () => ({
  getCoupons: jest.fn(),
}));

describe("coupons state 테스트", () => {
  it("쿠폰 목록을 반환한다", () => {
    const { result } = renderHook(() => useRecoilValue(couponsState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => set(couponsState, MOCK_CART_COUPONS)}
        >
          {children}
        </RecoilRoot>
      ),
    });

    expect(result.current).toBeDefined();
    expect(result.current).toEqual(MOCK_CART_COUPONS);
  });
});

describe("useCouponValidityChecker", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-27"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const initializeState = ({
    set,
  }: {
    set: <T>(
      recoilState: RecoilState<T>,
      valOrUpdater: T | ((currVal: T) => T)
    ) => void;
  }) => {
    set(cartItemsState, MOCK_CART_LIST);
    set(couponsState, MOCK_CART_COUPONS);

    Object.entries(MOCK_CART_ITEM_SELECTIONS).forEach(([id, isSelected]) => {
      set(cartItemSelectionsState(parseInt(id)), isSelected);
    });
  };

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용이 가능하다.", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[0])).toBe(true);
  });

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용이 가능하다.", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[0])).toBe(true);
  });

  it("사용 가능 시간 외에는 쿠폰 적용이 불가능하다", () => {
    const testTime = new Date("2023-05-01T08:00:00");
    jest.setSystemTime(testTime);

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[3])).toBe(false);
  });

  it("사용 가능 시간에는 쿠폰 적용이 가능하다.", () => {
    const testTime = new Date("2023-05-01T07:00:00");
    jest.setSystemTime(testTime);

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[3])).toBe(true);
  });
});

describe("useCouponValidityChecker", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-05-27"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const initializeState = ({
    set,
  }: {
    set: <T>(
      recoilState: RecoilState<T>,
      valOrUpdater: T | ((currVal: T) => T)
    ) => void;
  }) => {
    set(cartItemsState, MOCK_CART_LIST);
    set(couponsState, MOCK_CART_COUPONS);

    Object.entries(MOCK_CART_ITEM_SELECTIONS).forEach(([id, isSelected]) => {
      set(cartItemSelectionsState(parseInt(id)), isSelected);
    });
  };

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용이 가능하다.", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[0])).toBe(true);
  });

  it("주문 금액이 최소 주문 금액 이상이면 쿠폰 적용이 가능하다.", () => {
    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[0])).toBe(true);
  });

  it("사용 가능 시간 외에는 쿠폰 적용이 불가능하다", () => {
    const testTime = new Date("2023-05-01T08:00:00");
    jest.setSystemTime(testTime);

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[3])).toBe(false);
  });

  it("사용 가능 시간에는 쿠폰 적용이 가능하다.", () => {
    const testTime = new Date("2023-05-01T07:00:00");
    jest.setSystemTime(testTime);

    const { result } = renderHook(() => useCouponApplicabilityChecker(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={initializeState}>{children}</RecoilRoot>
      ),
    });

    expect(result.current.isCouponApplicable(MOCK_CART_COUPONS[3])).toBe(true);
  });
});
