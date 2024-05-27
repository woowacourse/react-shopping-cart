import { renderHook } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { mockCouponData } from "../mocks/mockCouponData";
import { mockCartItemsData } from "../mocks/mockCartItemsData";
import { selectedCouponState, cartItemsState, checkedItemState } from "../recoil/atoms/atoms";
import { useTotalDiscount } from "./useTotalDiscount";

describe("useTotalDiscount", () => {
  it("선택된 쿠폰이 없을 때는 할인 금액이 0이다", () => {
    const { result } = renderHook(() => useTotalDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItemsData.content);
            set(checkedItemState, {
              429: true,
              430: true,
              742: true,
            });
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBe(0);
  });

  it("하나의 고정 금액 할인 쿠폰을 적용할 수 있다", () => {
    const { result } = renderHook(() => useTotalDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItemsData.content);
            set(checkedItemState, {
              429: true,
              430: true,
              742: true,
            });
            set(selectedCouponState, [mockCouponData[0]]); // FIXED5000 쿠폰 선택
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBe(5000);
  });

  it("두 개의 쿠폰을 적용하여 최종 할인을 계산할 수 있다", () => {
    const { result } = renderHook(() => useTotalDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItemsData.content);
            set(checkedItemState, {
              429: true,
              430: true,
              742: true,
            });
            set(selectedCouponState, [mockCouponData[0], mockCouponData[1]]); // FIXED5000, BOGO 쿠폰 선택
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const expectedDiscount = 5000 + 2000; // 고정 5000원 할인 + BOGO 쿠폰
    expect(result.current).toBe(expectedDiscount);
  });

  it("비율 할인 쿠폰을 적용할 수 있다", () => {
    const { result } = renderHook(() => useTotalDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItemsData.content);
            set(checkedItemState, {
              429: true,
              430: true,
              742: true,
            });
            set(selectedCouponState, [mockCouponData[3]]); // MIRACLESALE 쿠폰 선택
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    const totalAmount = 2000 + 20000 + 1000;
    const expectedDiscount = Math.floor((totalAmount * 30) / 100); // 30% 할인
    expect(result.current).toBe(expectedDiscount);
  });

  it("무료 배송 쿠폰을 적용할 수 있다", () => {
    const { result } = renderHook(() => useTotalDiscount(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(cartItemsState, mockCartItemsData.content);
            set(checkedItemState, {
              429: true,
              430: true,
              742: true,
            });
            set(selectedCouponState, [mockCouponData[2]]); // FREESHIPPING 쿠폰 선택
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current).toBe(0); // 무료 배송은 가격 할인이 없으므로 0
  });
});
