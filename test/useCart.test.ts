import useCart from "../src/hooks/cart/useCart";
import MOCKING_CART_ITEMS_DATA from "../src/apis/mocks/data/cartItems.json";
import { server } from "../src/apis/mocks/node";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useCart 훅 테스트", () => {
  describe("초기화", () => {
    it("장바구니 초기 목록을 불러올 수 있다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemListProps.cartItems).toEqual(
          MOCKING_CART_ITEMS_DATA.content.map((item) => ({ ...item, isChecked: true })),
        );
      });
    });

    it("초기 상태에서 모든 상품이 체크된 상태여야 한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemListProps.isAllChecked).toBe(true);
        expect(result.current.cartItemListProps.cartItems.every((item) => item.isChecked)).toBe(true);
      });
    });

    it("장바구니 상품 개수를 올바르게 계산한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemsInfo.cartItemsCount).toBe(MOCKING_CART_ITEMS_DATA.content.length);
      });
    });
  });
  describe("가격 계산", () => {
    it("체크된 상품들의 주문 금액을 올바르게 계산한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        const expectedOrderPrice = MOCKING_CART_ITEMS_DATA.content.reduce((acc, item) => {
          return acc + item.quantity * item.product.price;
        }, 0);
        expect(result.current.cartItemsInfo.orderPrice).toBe(expectedOrderPrice);
      });
    });

    it("주문 금액이 100,000원 이상일 때 배송비가 0원이어야 한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemsInfo.deliveryPrice).toBe(0);
      });
    });

    it("총 결제 금액이 올바르게 계산된다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        const { orderPrice, deliveryPrice, totalPrice } = result.current.cartItemsInfo;
        expect(totalPrice).toBe(orderPrice + deliveryPrice);
      });
    });
  });

  describe("체크박스 기능", () => {
    it("전체 선택/해제 기능이 올바르게 동작한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemListProps.isAllChecked).toBe(true);
      });

      act(() => {
        result.current.cartItemListProps.handleCheckChange({ action: "all" });
      });

      expect(result.current.cartItemListProps.isAllChecked).toBe(false);
      expect(result.current.cartItemListProps.cartItems.every((item) => !item.isChecked)).toBe(true);
      expect(result.current.cartItemsInfo.orderPrice).toBe(0);
      expect(result.current.cartItemsInfo.deliveryPrice).toBe(0);

      act(() => {
        result.current.cartItemListProps.handleCheckChange({ action: "all" });
      });

      expect(result.current.cartItemListProps.isAllChecked).toBe(true);
      expect(result.current.cartItemListProps.cartItems.every((item) => item.isChecked)).toBe(true);
    });

    it("개별 상품 선택/해제 기능이 올바르게 동작한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemListProps.cartItems.length).toBeGreaterThan(0);
      });
      const firstItemId = result.current.cartItemListProps.cartItems[0].id;

      act(() => {
        result.current.cartItemListProps.handleCheckChange({ action: "each", id: firstItemId });
      });
      const cartItems = result.current.cartItemListProps.cartItems;
      expect(cartItems.find((item) => item.id === firstItemId)?.isChecked).toBe(false);
      expect(result.current.cartItemListProps.isAllChecked).toBe(false);

      act(() => {
        result.current.cartItemListProps.handleCheckChange({ action: "each", id: firstItemId });
      });

      await waitFor(() => {
        expect(result.current.cartItemListProps.cartItems.find((item) => item.id === firstItemId)?.isChecked).toBe(
          true,
        );
      });
    });

    it("일부 상품만 체크된 경우 가격이 올바르게 계산된다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemListProps.cartItems.length).toBeGreaterThan(1);
      });
      const firstItemId = result.current.cartItemListProps.cartItems[0].id;

      act(() => {
        result.current.cartItemListProps.handleCheckChange({ action: "each", id: firstItemId });
      });

      const checkedItems = result.current.cartItemListProps.cartItems.filter((item) => item.isChecked);
      const expectedPrice = checkedItems.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0);

      expect(result.current.cartItemsInfo.orderPrice).toBe(expectedPrice);
    });
  });

  describe("장바구니 상품 수정", () => {
    it("handleCartItemChange(action: 'patch') 함수가 올바른 파라미터로 호출된다.", async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => {
        expect(result.current.cartItemListProps.cartItems[0]).toBeDefined();
      });

      const cartItem = result.current.cartItemListProps.cartItems[0];
      const { id, quantity: initialQuantity } = cartItem;
      const newQuantity = initialQuantity + 1;

      await act(async () => {
        result.current.cartItemListProps.handleCartItemChange({
          id,
          action: "patch",
          quantity: newQuantity,
        });
      });

      await waitFor(() => {
        const updatedItem = result.current.cartItemListProps.cartItems.find((item) => item.id === id);
        expect(updatedItem).toBeDefined();
        expect(updatedItem?.quantity).toBe(newQuantity);
      });
    });

    it("handleCartItemChange(action: 'patch') 수량 감소 시 함수가 정상 호출된다.", async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => {
        const cartItemWithMultipleQuantity = result.current.cartItemListProps.cartItems.find(
          (item) => item.quantity > 1,
        );

        expect(cartItemWithMultipleQuantity).toBeDefined();
      });

      const cartItem = result.current.cartItemListProps.cartItems.find((item) => item.quantity > 1)!;
      const { id, quantity: initialQuantity } = cartItem;
      const newQuantity = initialQuantity - 1;

      await act(async () => {
        result.current.cartItemListProps.handleCartItemChange({
          id,
          action: "patch",
          quantity: newQuantity,
        });
      });

      await waitFor(() => {
        const updatedItem = result.current.cartItemListProps.cartItems.find((item) => item.id === id);
        expect(updatedItem).toBeDefined();
      });
    });

    it("handleCartItemChange(action: 'delete') 호출 시 장바구니 항목이 제거된다.", async () => {
      const { result } = renderHook(() => useCart());

      let targetId: number;
      await waitFor(() => {
        const cartItems = result.current.cartItemListProps.cartItems;
        expect(cartItems.length).toBeGreaterThan(0);
        targetId = cartItems[0].id;
      });

      const initialCount = result.current.cartItemListProps.cartItems.length;

      await act(async () => {
        result.current.cartItemListProps.handleCartItemChange({
          id: targetId,
          action: "delete",
        });
      });

      await waitFor(() => {
        const cartItems = result.current.cartItemListProps.cartItems;
        expect(cartItems.some((item) => item.id === targetId)).toBe(false);
        expect(cartItems.length).toBe(initialCount - 1);
      });
    });
  });

  describe("주문 결과", () => {
    it("체크된 상품들의 총 수량을 올바르게 계산한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        const checkedItems = result.current.cartItemListProps.cartItems.filter((item) => item.isChecked);
        const expectedTotalQuantity = checkedItems.reduce((acc, item) => acc + item.quantity, 0);
        expect(result.current.orderResult.cartItemsTotalQuantity).toBe(expectedTotalQuantity);
      });
    });

    it("체크된 상품의 종류 수를 올바르게 계산한다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        const checkedCount = result.current.cartItemListProps.cartItems.filter((item) => item.isChecked).length;
        expect(result.current.orderResult.cartItemsCheckedCount).toBe(checkedCount);
      });
    });

    it("일부 상품만 체크된 경우 주문 결과가 올바르게 계산된다.", async () => {
      const { result } = renderHook(() => useCart());
      await waitFor(() => {
        expect(result.current.cartItemListProps.cartItems.length).toBeGreaterThan(1);
      });
      const firstItemId = result.current.cartItemListProps.cartItems[0].id;

      act(() => {
        result.current.cartItemListProps.handleCheckChange({ action: "each", id: firstItemId });
      });

      const checkedItems = result.current.cartItemListProps.cartItems.filter((item) => item.isChecked);
      const expectedCheckedCount = checkedItems.length;
      const expectedTotalQuantity = checkedItems.reduce((acc, item) => acc + item.quantity, 0);

      expect(result.current.orderResult.cartItemsCheckedCount).toBe(expectedCheckedCount);
      expect(result.current.orderResult.cartItemsTotalQuantity).toBe(expectedTotalQuantity);
    });
  });
});
