import { describe, it, expect } from "vitest";
import { getMaxPriceInSelectedCart } from "./getMaxPriceInSelectedCart";
import { mockSelectedCartItems } from "../mocks/mockCartItems";

describe("getMaxPriceInSelectedCart", () => {
  it("선택된 아이템이 없으면 0을 반환한다", () => {
    const result = getMaxPriceInSelectedCart({ selectedCartItems: [] });
    expect(result).toBe(0);
  });

  it("하나의 아이템이 선택된 경우 해당 가격을 반환한다", () => {
    const result = getMaxPriceInSelectedCart({
      selectedCartItems: [mockSelectedCartItems[0]],
    });
    expect(result).toBe(7000);
  });

  it("여러 아이템 중 가장 비싼 상품의 가격을 반환한다", () => {
    const result = getMaxPriceInSelectedCart({
      selectedCartItems: mockSelectedCartItems,
    });
    expect(result).toBe(12000);
  });
});
