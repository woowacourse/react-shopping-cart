import { describe, it, expect } from "vitest";
import { calculateCartItemQuantity } from "./calculateCartItemQuantity";

describe("calculateCartItemQuantity 함수 동작을 검증한다", () => {
  let cartItems: { id: number; quantity: number }[];
  beforeEach(() => {
    cartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 1 },
    ];
  });

  it("선택된 장바구니 아이템의 수량을 합산해서 반환한다", () => {
    const selectedCartIds = ["1", "3"];

    const result = calculateCartItemQuantity({ cartItems, selectedCartIds });

    expect(result).toBe(3);
  });

  it("선택된 항목이 없으면 0을 반환한다", () => {
    const selectedCartIds: string[] = [];

    const result = calculateCartItemQuantity({ cartItems, selectedCartIds });

    expect(result).toBe(0);
  });

  it("선택된 항목이 cartItems에 없는 경우 무시된다", () => {
    const selectedCartIds = ["1", "999"];

    const result = calculateCartItemQuantity({ cartItems, selectedCartIds });

    expect(result).toBe(2);
  });
});
