import { renderHook, waitFor } from "@testing-library/react";
import { cartAmountState } from ".";
import { RecoilRoot, useRecoilValue } from "recoil";
import { rawCartItemsState } from "../rawCartItems";
import { selectedCartItemIdsState } from "../selectedCartItemIds";
import { EXPECTED_CART_AMOUNT, MOCK_RAW_CART_ITEMS, MOCK_SELECTED_CART_ITEM_IDS } from "./mock";
import { Suspense } from "react";

describe("cartAmountState selector", () => {
  it("장바구니 목록의 금액 합계를 올바르게 계산한다.", async () => {
    const { result, rerender } = renderHook(() => useRecoilValue(cartAmountState), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(rawCartItemsState, MOCK_RAW_CART_ITEMS);
            set(selectedCartItemIdsState, MOCK_SELECTED_CART_ITEM_IDS);
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
