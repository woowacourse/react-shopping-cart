import { describe, it, expect } from "vitest";
import { getDeliveryFee } from "./getDeliveryFee";

describe("getDeliveryFee 함수 테스트", () => {
  it.each([
    [100_000, false, 0], //경계값
    [150_000, false, 0],
    [99_999, false, 3000],
    [50_000, false, 3000],
    [100_000, true, 3000],
    [50_000, true, 6000],
  ])(
    "orderPrice: %i, isExtraDeliveryArea: %s → deliveryFee: %i",
    (orderPrice, isExtraDeliveryArea, expected) => {
      const result = getDeliveryFee({ orderPrice, isExtraDeliveryArea });
      expect(result).toBe(expected);
    }
  );
});
