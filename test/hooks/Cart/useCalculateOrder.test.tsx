import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CartItem } from "../../../src/type/CartItem";
import {
  FREE_SHIPPING_OVER,
  SHIPPING_FEE,
} from "../../../src/constants/priceSetting";
import { useCalculateOrder } from "@/hooks/Cart/useCalculateOrder";

// 테스트용 목 데이터
const mockCartItems: CartItem[] = [
  {
    id: "1",
    quantity: 2,
    product: {
      id: "product-1",
      name: "상품 1",
      price: 30000,
      imageUrl: "image1.jpg",
      category: "카테고리 1",
      quantity: 10,
    },
  },
  {
    id: "2",
    quantity: 1,
    product: {
      id: "product-2",
      name: "상품 2",
      price: 50000,
      imageUrl: "image2.jpg",
      category: "카테고리 2",
      quantity: 5,
    },
  },
  {
    id: "3",
    quantity: 3,
    product: {
      id: "product-3",
      name: "상품 3",
      price: 20000,
      imageUrl: "image3.jpg",
      category: "카테고리 3",
      quantity: 8,
    },
  },
];

describe("useCalculateOrder는", () => {
  it("선택된 아이템이 없을 때 올바른 초기값을 반환해야 한다", () => {
    const selectedCartIds = new Set<string>();
    const { result } = renderHook(() =>
      useCalculateOrder(mockCartItems, selectedCartIds)
    );

    expect(result.current.selectedCartItemsCount).toBe(0);
    expect(result.current.selectedCartItemsLength).toBe(0);
    expect(result.current.isAllSelected).toBe(false);
    expect(result.current.subtotalPrice).toBe(0);
    expect(result.current.finalPrice).toBe(SHIPPING_FEE);
    expect(result.current.shippingFee).toBe(SHIPPING_FEE);
  });

  it("일부 아이템이 선택되었을 때 올바른 계산 결과를 반환해야 한다", () => {
    const selectedCartIds = new Set(["1", "2"]);
    const { result } = renderHook(() =>
      useCalculateOrder(mockCartItems, selectedCartIds)
    );

    // 선택된 아이템: 상품1(30000*2) + 상품2(50000*1) = 110000
    // 수량: 2 + 1 = 3
    // 선택된 아이템 개수: 2개
    expect(result.current.selectedCartItemsCount).toBe(3);
    expect(result.current.selectedCartItemsLength).toBe(2);
    expect(result.current.isAllSelected).toBe(false);
    expect(result.current.subtotalPrice).toBe(110000);
    // 110000 >= 100000이므로 무료배송
    expect(result.current.finalPrice).toBe(110000);
  });

  it("모든 아이템이 선택되었을 때 isAllSelected가 true여야 한다", () => {
    const selectedCartIds = new Set(["1", "2", "3"]);
    const { result } = renderHook(() =>
      useCalculateOrder(mockCartItems, selectedCartIds)
    );

    // 선택된 아이템: 상품1(30000*2) + 상품2(50000*1) + 상품3(20000*3) = 170000
    // 수량: 2 + 1 + 3 = 6
    // 선택된 아이템 개수: 3개
    expect(result.current.selectedCartItemsCount).toBe(6);
    expect(result.current.selectedCartItemsLength).toBe(3);
    expect(result.current.isAllSelected).toBe(true);
    expect(result.current.subtotalPrice).toBe(170000);
    expect(result.current.finalPrice).toBe(170000);
  });

  it("무료배송 기준 미만일 때 배송비가 추가되어야 한다", () => {
    const selectedCartIds = new Set(["3"]);
    const { result } = renderHook(() =>
      useCalculateOrder(mockCartItems, selectedCartIds)
    );

    // 선택된 아이템: 상품3(20000*3) = 60000
    // 60000 < 100000이므로 배송비 추가
    expect(result.current.subtotalPrice).toBe(60000);
    expect(result.current.finalPrice).toBe(60000 + SHIPPING_FEE);
  });

  it("무료배송 기준과 정확히 같을 때 배송비가 추가되지 않아야 한다", () => {
    const freeShippingCartItems: CartItem[] = [
      {
        id: "1",
        quantity: 1,
        product: {
          id: "product-1",
          name: "무료배송 상품",
          price: FREE_SHIPPING_OVER,
          imageUrl: "image.jpg",
          category: "카테고리",
          quantity: 10,
        },
      },
    ];

    const selectedCartIds = new Set(["1"]);
    const { result } = renderHook(() =>
      useCalculateOrder(freeShippingCartItems, selectedCartIds)
    );

    expect(result.current.subtotalPrice).toBe(FREE_SHIPPING_OVER);
    expect(result.current.finalPrice).toBe(FREE_SHIPPING_OVER);
  });

  it("장바구니가 비어있을 때 올바른 값을 반환해야 한다", () => {
    const emptyCartItems: CartItem[] = [];
    const selectedCartIds = new Set<string>();
    const { result } = renderHook(() =>
      useCalculateOrder(emptyCartItems, selectedCartIds)
    );

    expect(result.current.selectedCartItemsCount).toBe(0);
    expect(result.current.selectedCartItemsLength).toBe(0);
    expect(result.current.isAllSelected).toBe(false);
    expect(result.current.subtotalPrice).toBe(0);
    expect(result.current.finalPrice).toBe(SHIPPING_FEE);
  });

  it("장바구니에 아이템이 있지만 아무것도 선택하지 않았을 때", () => {
    const selectedCartIds = new Set<string>();
    const { result } = renderHook(() =>
      useCalculateOrder(mockCartItems, selectedCartIds)
    );

    expect(result.current.selectedCartItemsCount).toBe(0);
    expect(result.current.selectedCartItemsLength).toBe(0);
    expect(result.current.isAllSelected).toBe(false);
    expect(result.current.subtotalPrice).toBe(0);
    expect(result.current.finalPrice).toBe(SHIPPING_FEE);
  });

  it("선택된 아이템이 변경될 때 계산이 다시 수행되어야 한다", () => {
    const selectedCartIds = new Set(["1"]);
    const { result, rerender } = renderHook(
      ({ cartItems, selectedIds }) => useCalculateOrder(cartItems, selectedIds),
      {
        initialProps: {
          cartItems: mockCartItems,
          selectedIds: selectedCartIds,
        },
      }
    );

    // 초기 상태: 상품1만 선택 (30000*2 = 60000)
    expect(result.current.subtotalPrice).toBe(60000);
    expect(result.current.finalPrice).toBe(60000 + SHIPPING_FEE);

    // 상품2도 추가 선택
    const newSelectedCartIds = new Set(["1", "2"]);
    rerender({
      cartItems: mockCartItems,
      selectedIds: newSelectedCartIds,
    });

    // 새로운 상태: 상품1 + 상품2 (30000*2 + 50000*1 = 110000)
    expect(result.current.subtotalPrice).toBe(110000);
    expect(result.current.finalPrice).toBe(110000); // 무료배송
  });

  it("동일한 입력에 대해 일관된 결과를 반환해야 한다", () => {
    const selectedCartIds = new Set(["1", "2"]);
    const { result, rerender } = renderHook(() =>
      useCalculateOrder(mockCartItems, selectedCartIds)
    );

    const firstResult = result.current;

    // 동일한 데이터로 리렌더링
    rerender();

    const secondResult = result.current;

    // 값이 동일해야 함
    expect(firstResult.selectedCartItemsCount).toBe(
      secondResult.selectedCartItemsCount
    );
    expect(firstResult.selectedCartItemsLength).toBe(
      secondResult.selectedCartItemsLength
    );
    expect(firstResult.isAllSelected).toBe(secondResult.isAllSelected);
    expect(firstResult.subtotalPrice).toBe(secondResult.subtotalPrice);
    expect(firstResult.finalPrice).toBe(secondResult.finalPrice);
    expect(firstResult.shippingFee).toBe(secondResult.shippingFee);
  });
});
