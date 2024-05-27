import { RecoilRoot, useRecoilValue } from "recoil";
import { mockCoupons } from "../mocks/coupons";
import { renderHook, waitFor } from "@testing-library/react";
import { selectedCartItemIdsState } from "../recoil/cart/selectedCartItemIds";
import { Suspense, act } from "react";
import { useCouponControl } from "./useCouponControl";
import { fetchCartItems } from "../api/cartItems";
import { Coupon } from "../types/coupons";
import { couponsState } from "../recoil/coupon/coupons";
import { discountAmountState } from "../recoil/cartAmount";

jest.mock("../api/cartItems");
jest.mock("../api/coupons");

describe("useCouponControl", () => {
  const mockCartItems = [
    {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: "리복",
        price: 10000,
        imageUrl: "www.naver.com",
        category: "스포츠",
      },
    },
    {
      id: 2,
      quantity: 2,
      product: {
        id: 2,
        name: "리복2",
        price: 10000,
        imageUrl: "www.naver.com",
        category: "스포츠",
      },
    },
  ];

  it("초기 discountAmount 값은 0이다.", async () => {
    (fetchCartItems as jest.Mock).mockResolvedValueOnce(mockCartItems);

    const { result } = renderHook(() => useCouponControl(mockCoupons), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdsState, [1, 2]);
          }}
        >
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current.discountAmount).toBe(0);
    });
  });

  it("toggleSelection이 실행되면, 지역 상태 coupons의 isSelected 속성이 토글되고, discountAmount 재계산된다.", async () => {
    (fetchCartItems as jest.Mock).mockResolvedValueOnce(mockCartItems);

    const mockCoupons: Coupon[] = [
      {
        id: 1,
        code: "FIXED2000",
        description: "2,000원 할인 쿠폰",
        discount: 2000,
        discountType: "fixed",
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      },
      {
        id: 2,
        code: "FIXED1000",
        description: "1,000원 할인 쿠폰",
        discount: 1000,
        discountType: "fixed",
        minimumAmount: 10000,
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      },
    ];

    const { result } = renderHook(() => useCouponControl(mockCoupons), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdsState, [1, 2]);
          }}
        >
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current.coupons[0].isSelected).toBe(false);
      expect(result.current.coupons[1].isSelected).toBe(false);
      expect(result.current.discountAmount).toBe(0);
    });

    act(() => {
      result.current.toggleSelection(result.current.coupons[0].id);
    });

    expect(result.current.coupons[0].isSelected).toBe(true);
    expect(result.current.discountAmount).toBe(2000);

    act(() => {
      result.current.toggleSelection(result.current.coupons[1].id);
    });

    expect(result.current.coupons[1].isSelected).toBe(true);
    expect(result.current.discountAmount).toBe(3000);
  });

  it("applySelectedCoupons가 실행되면, 전역 상태 couponsState(atom)이 지역 상태 coupons의 값으로 업데이트되고, 전역 상태 discountAmountState(selector)도 재계산된다.", async () => {
    const mockCoupons: Coupon[] = [
      {
        id: 1,
        code: "FIXED2000",
        description: "2,000원 할인 쿠폰",
        discount: 2000,
        discountType: "fixed",
        expirationDate: "2024-11-30",
        isSelected: true,
        isValidCoupon: true,
        isApplicableCoupon: true,
      },
      {
        id: 2,
        code: "FIXED1000",
        description: "1,000원 할인 쿠폰",
        discount: 1000,
        discountType: "fixed",
        minimumAmount: 10000,
        expirationDate: "2024-11-30",
        isSelected: false,
        isValidCoupon: true,
        isApplicableCoupon: true,
      },
    ];

    const { result } = renderHook(
      () => {
        const controlReturn = useCouponControl(mockCoupons);
        const globalCouponsState = useRecoilValue(couponsState);
        const globalDiscountAmountState = useRecoilValue(discountAmountState);
        return {
          ...controlReturn,
          globalCouponsState,
          globalDiscountAmountState,
        };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => {
              set(selectedCartItemIdsState, [1, 2]);
            }}
          >
            <Suspense>{children}</Suspense>
          </RecoilRoot>
        ),
      }
    );

    await waitFor(() => {
      expect(result.current.globalCouponsState).toEqual([]);
      expect(result.current.globalDiscountAmountState).toBe(0);
    });

    act(() => {
      result.current.applySelectedCoupons();
    });

    expect(result.current.globalCouponsState).toEqual(result.current.coupons);
    expect(result.current.globalDiscountAmountState).toBe(2000);
  });
});
