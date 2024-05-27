import { renderHook, waitFor } from "@testing-library/react";
import { fetchCoupons } from "../api/coupons";
import { mockRawCoupons } from "../mocks/coupons";
import { useFetchCoupons } from "./useFetchCoupons";
import { RecoilRoot } from "recoil";
import { rawCartItemsState } from "../recoil/cart/rawCartItems";
import { selectedCartItemIdsState } from "../recoil/cart/selectedCartItemIds";
import { Suspense } from "react";
import { isValidCoupon } from "../utils/validateCoupon";
import { checkApplicableCoupon } from "../utils/checkApplicableCoupon";
import { CartItem } from "../types/cartItems";

jest.mock("../api/coupons");

describe("useFetchCoupons", () => {
  it("fetchCoupons 요청이 완료되면 coupons에는 쿠폰 목록(Coupon[])이 저장된다.", async () => {
    const mockCartItems: CartItem[] = [
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
        isSelected: true,
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
        isSelected: true,
      },
    ];
    const orderAmount = mockCartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity * cartItem.product.price,
      0
    );

    (fetchCoupons as jest.Mock).mockResolvedValueOnce(mockRawCoupons);

    const { result } = renderHook(() => useFetchCoupons(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(rawCartItemsState, mockCartItems);
            set(selectedCartItemIdsState, [1, 2]);
          }}
        >
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(() => {
      expect(result.current.coupons).toEqual(
        mockRawCoupons.map((rawCoupon) => ({
          ...rawCoupon,
          isSelected: false,
          isValidCoupon: isValidCoupon(rawCoupon),
          isApplicableCoupon: checkApplicableCoupon(rawCoupon, {
            orderAmount,
            cartItems: mockCartItems,
          }),
        }))
      );
    });
  });
});
