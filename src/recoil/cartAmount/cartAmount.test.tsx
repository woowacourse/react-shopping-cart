import { renderHook, waitFor } from "@testing-library/react";
import { cartAmountState } from ".";
import { RecoilRoot, useRecoilValue } from "recoil";
import { rawCartItemsState } from "../rawCartItems";
import { selectedCartItemIdsState } from "../selectedCartItemIds";
import { Suspense } from "react";
import { CartItemId, RawCartItem } from "../../types/cartItems";

describe("cartAmountState selector", () => {
  const TEST_RAW_CART_ITEMS: RawCartItem[] = [
    {
      id: 1,
      quantity: 2,
      product: {
        id: 101,
        name: "Product 1",
        price: 10_000,
        imageUrl: "https://example.com/product1.jpg",
        category: "Category 1",
      },
    },
    {
      id: 2,
      quantity: 1,
      product: {
        id: 102,
        name: "Product 2",
        price: 20_000,
        imageUrl: "https://example.com/product2.jpg",
        category: "Category 2",
      },
    },
    {
      id: 3,
      quantity: 3,
      product: {
        id: 103,
        name: "Product 3",
        price: 15_000,
        imageUrl: "https://example.com/product3.jpg",
        category: "Category 3",
      },
    },
  ];

  const TEST_SELECTED_CART_ITEM_IDS: CartItemId[] = [1, 3];

  const EXPECTED_CART_AMOUNT = {
    orderAmount: 65_000,
    shippingCost: 3_000,
    totalOrderAmount: 68_000,
  };

  it("장바구니 목록의 금액 합계를 올바르게 계산한다.", async () => {
    const { result, rerender } = renderHook(() => useRecoilValue(cartAmountState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(rawCartItemsState, TEST_RAW_CART_ITEMS);
            set(selectedCartItemIdsState, TEST_SELECTED_CART_ITEM_IDS);
          }}
        >
          <Suspense>{children}</Suspense>
        </RecoilRoot>
      ),
    });

    rerender();

    await waitFor(() => {
      expect(result.current).toEqual(EXPECTED_CART_AMOUNT);
    });
  });
});
