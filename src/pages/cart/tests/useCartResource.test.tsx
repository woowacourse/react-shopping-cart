import { renderHook, act, waitFor } from "@testing-library/react";
import useCartResource from "../hooks/useCartResource";
import { server } from "../../../shared/apis/mocks/node";
import MOCKING_CART_ITEMS_DATA from "../../../shared/apis/mocks/data/cartItems.json";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { ErrorProvider } from "../../../shared/contexts/ErrorContext";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => <ErrorProvider>{children} </ErrorProvider>;

describe("useCartResource 훅 테스트", () => {
  describe("초기화", () => {
    it("장바구니 초기 목록을 불러올 수 있다.", async () => {
      const { result } = renderHook(() => useCartResource(), { wrapper });

      await act(async () => {
        result.current.fetchCartItems();
      });
      await waitFor(() => {
        expect(result.current.cartItems).toEqual(MOCKING_CART_ITEMS_DATA.content);
      });

      expect(result.current.cartItemIds).toEqual(MOCKING_CART_ITEMS_DATA.content.map((item) => item.id));
    });
  });

  describe("장바구니 상품 수정", () => {
    it("상품 수량을 변경할 수 있다.", async () => {
      const { result } = renderHook(() => useCartResource(), { wrapper });

      await act(async () => {
        result.current.fetchCartItems();
      });

      const cartItem = result.current.cartItems[0];
      const { id, quantity: initialQuantity } = cartItem;
      const newQuantity = initialQuantity + 1;

      await act(async () => {
        result.current.patchCartItem({
          id,
          quantity: newQuantity,
        });
      });

      await waitFor(() => {
        const updatedItem = result.current.cartItems.find((item) => item.id === id);
        expect(updatedItem).toBeDefined();
        expect(updatedItem?.quantity).toBe(newQuantity);
      });
    });

    it("상품을 삭제할 수 있다.", async () => {
      const { result } = renderHook(() => useCartResource(), { wrapper });

      await act(async () => {
        result.current.fetchCartItems();
      });

      const targetId = result.current.cartItems[0].id;
      const initialCount = result.current.cartItems.length;

      await act(async () => {
        result.current.deleteCartItem({
          id: targetId,
        });
      });

      await waitFor(() => {
        const cartItems = result.current.cartItems;
        expect(cartItems.some((item) => item.id === targetId)).toBe(false);
        expect(cartItems.length).toBe(initialCount - 1);
      });
    });
  });
});
