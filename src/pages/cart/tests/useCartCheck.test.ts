import { renderHook, act } from "@testing-library/react";
import useCartCheck from "../hooks/useCartCheck";
import { server } from "../../../shared/apis/mocks/node";
import MOCKING_CART_ITEMS_DATA from "../../../shared/apis/mocks/data/cartItems.json";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useCartCheck 훅 테스트", () => {
  const mockCartItemIds = MOCKING_CART_ITEMS_DATA.content.map((item) => item.id);

  describe("초기화", () => {
    it("초기 상태에서 모든 상품이 체크되어야 한다.", () => {
      const { result } = renderHook(() => useCartCheck(mockCartItemIds));

      expect(result.current.checkedIds).toEqual(mockCartItemIds);
      expect(result.current.isAllChecked).toBe(true);
    });
  });

  describe("체크박스 기능", () => {
    it("전체 선택/해제 기능이 올바르게 동작한다.", () => {
      const { result } = renderHook(() => useCartCheck(mockCartItemIds));

      act(() => {
        result.current.handleCheckChange({ action: "all" });
      });
      expect(result.current.checkedIds).toEqual([]);
      expect(result.current.isAllChecked).toBe(false);

      act(() => {
        result.current.handleCheckChange({ action: "all" });
      });
      expect(result.current.checkedIds).toEqual(mockCartItemIds);
      expect(result.current.isAllChecked).toBe(true);
    });

    it("개별 상품 선택/해제 기능이 올바르게 동작한다.", () => {
      const { result } = renderHook(() => useCartCheck(mockCartItemIds));

      const firstItemId = mockCartItemIds[0];
      act(() => {
        result.current.handleCheckChange({ action: "each", id: firstItemId });
      });
      expect(result.current.checkedIds).toEqual(mockCartItemIds.slice(1));
      expect(result.current.isAllChecked).toBe(false);

      // 첫 번째 상품 다시 선택
      act(() => {
        result.current.handleCheckChange({ action: "each", id: firstItemId });
      });
      expect(result.current.checkedIds).toEqual([...mockCartItemIds.slice(1), firstItemId]);
      expect(result.current.isAllChecked).toBe(true);
    });
  });
});
