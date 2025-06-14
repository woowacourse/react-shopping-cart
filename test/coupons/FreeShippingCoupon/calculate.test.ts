import { describe, it, expect } from "vitest";
import {
  REMOTE_AREA_SHIPPING_FEE,
  SHIPPING_FEE,
} from "../../../src/constants/priceSetting";
import { calculateFreeShippingCoupon } from "../../../src/util/coupons/FreeShippingCoupon/calculate";

describe("calculateFreeShippingCoupon", () => {
  it("일반 배송과 도서산간 배송 둘 다 있을 때 총 배송비 할인을 반환해야 한다", () => {
    expect(
      calculateFreeShippingCoupon({
        hasDefaultShipping: true,
        hasRemoteAreaShipping: true,
      })
    ).toBe(SHIPPING_FEE + REMOTE_AREA_SHIPPING_FEE);
  });

  it("일반 배송만 있을 때 일반 배송비 할인을 반환해야 한다", () => {
    expect(
      calculateFreeShippingCoupon({
        hasDefaultShipping: true,
        hasRemoteAreaShipping: false,
      })
    ).toBe(SHIPPING_FEE);
  });

  it("도서산간 배송만 있을 때 도서산간 배송비 할인을 반환해야 한다", () => {
    expect(
      calculateFreeShippingCoupon({
        hasDefaultShipping: false,
        hasRemoteAreaShipping: true,
      })
    ).toBe(REMOTE_AREA_SHIPPING_FEE);
  });

  it("두 가지 배송비 모두 없을 때 0을 반환해야 한다", () => {
    expect(
      calculateFreeShippingCoupon({
        hasDefaultShipping: false,
        hasRemoteAreaShipping: false,
      })
    ).toBe(0);
  });
});
