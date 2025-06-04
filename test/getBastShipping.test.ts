// __tests__/getBaseShipping.test.ts

import { describe, it, expect } from "vitest";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";
import { FREE_SHIPPING_OVER, SHIPPING_FEE } from "@/constants/priceSetting";

describe("getBaseShipping 함수", () => {
  it("subtotal이 FREE_SHIPPING_OVER와 같고 섬 지역이 아닐 때 0원을 반환해야 한다", () => {
    const subtotal = FREE_SHIPPING_OVER;
    const isIsland = false;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(0);
  });

  it("subtotal이 FREE_SHIPPING_OVER와 같고 섬 지역일 때 3000원을 반환해야 한다", () => {
    const subtotal = FREE_SHIPPING_OVER;
    const isIsland = true;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(3000);
  });

  it("subtotal이 FREE_SHIPPING_OVER보다 크고 섬 지역이 아닐 때 0원을 반환해야 한다", () => {
    const subtotal = FREE_SHIPPING_OVER + 1;
    const isIsland = false;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(0);
  });

  it("subtotal이 FREE_SHIPPING_OVER보다 크고 섬 지역일 때 3000원을 반환해야 한다", () => {
    const subtotal = FREE_SHIPPING_OVER + 5000;
    const isIsland = true;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(3000);
  });

  it("subtotal이 FREE_SHIPPING_OVER보다 작고 섬 지역이 아닐 때 SHIPPING_FEE를 반환해야 한다", () => {
    const subtotal = FREE_SHIPPING_OVER - 1;
    const isIsland = false;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(SHIPPING_FEE);
  });

  it("subtotal이 FREE_SHIPPING_OVER보다 작고 섬 지역일 때 SHIPPING_FEE + 3000원을 반환해야 한다", () => {
    const subtotal = FREE_SHIPPING_OVER - 10000;
    const isIsland = true;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(SHIPPING_FEE + 3000);
  });

  it("subtotal이 0이고 섬 지역이 아닐 때 SHIPPING_FEE를 반환해야 한다", () => {
    const subtotal = 0;
    const isIsland = false;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(SHIPPING_FEE);
  });

  it("subtotal이 0이고 섬 지역일 때 SHIPPING_FEE + 3000원을 반환해야 한다", () => {
    const subtotal = 0;
    const isIsland = true;
    const result = getBaseShipping(subtotal, isIsland);
    expect(result).toBe(SHIPPING_FEE + 3000);
  });
});
