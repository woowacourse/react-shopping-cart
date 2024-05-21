import { act, renderHook } from "@testing-library/react";
import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { deleteCartItem } from "../src/api";
import useDeleteCartItem from "../src/hooks/useDeleteCartItem";
import { cartListState } from "../src/recoil/atoms";
import CartItemLocalStorage, {
  KEY,
} from "../src/services/CartItemLocalStorage";

vi.mock("../src/api");
vi.mock("../src/services/CartItemLocalStorage");

describe("useDeleteCartItem 훅 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("장바구니에서 상품을 제거할 때 정상적으로 동작해야 한다.", async () => {
    const itemId = 123;
    const initialCartList = [
      { id: itemId, name: "Product 1", price: 1000, quantity: 1 },
      { id: 456, name: "Product 2", price: 2000, quantity: 2 },
    ];

    const { result } = renderHook(
      () => {
        const deleteCartItem = useDeleteCartItem(itemId);
        return { deleteCartItem, cartList: useRecoilValue(cartListState) };
      },
      {
        wrapper: ({ children }) => (
          <RecoilRoot
            initializeState={({ set }) => set(cartListState, initialCartList)}
          >
            {children}
          </RecoilRoot>
        ),
      }
    );

    expect(result.current.cartList.length).toBe(2);

    await act(async () => {
      await result.current.deleteCartItem.handleDelete();
    });

    expect(result.current.cartList.length).toBe(1);
    expect(
      result.current.cartList.find((item) => item.id === itemId)
    ).toBeUndefined();

    expect(deleteCartItem).toHaveBeenCalledTimes(1);
    expect(deleteCartItem).toHaveBeenCalledWith(itemId);

    expect(CartItemLocalStorage.delete).toHaveBeenCalledTimes(1);
    expect(CartItemLocalStorage.delete).toHaveBeenCalledWith(KEY, itemId);
  });
});
