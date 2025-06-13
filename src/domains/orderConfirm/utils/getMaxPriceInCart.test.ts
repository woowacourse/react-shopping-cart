import { describe, it, expect } from "vitest";
import { getMaxPriceInCart } from "./getMaxPriceInCart";
import { mockSelectedCartItems } from "../mocks/mockCartItems";

describe("getMaxPriceInCart", () => {
  it("선택된 아이템이 없으면 0을 반환한다", () => {
    const result = getMaxPriceInCart({ selectedCartItems: [] });
    expect(result).toBe(0);
  });

  it("하나의 아이템이 선택된 경우 해당 가격을 반환한다", () => {
    const result = getMaxPriceInCart({
      selectedCartItems: [mockSelectedCartItems[0]],
    });
    expect(result).toBe(5000);
  });

  it("여러 아이템 중 가장 비싼 상품의 가격을 반환한다", () => {
    const result = getMaxPriceInCart({
      selectedCartItems: mockSelectedCartItems,
    });
    expect(result).toBe(12000);
  });
});
