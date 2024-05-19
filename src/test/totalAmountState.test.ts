import { snapshot_UNSTABLE } from "recoil";
import { describe, it, expect } from "vitest";

import { cartState } from "@/store/atom/atoms";
import { totalAmountState } from "@/store/selector/selectors";

import { chargeShippingDummy, freeShippingDummy } from "@/mock/dummy";

describe("totalAmountState", () => {
  it("상품 개수에 따른 총 가격 계산", async () => {
    // Arrange
    // dummy데이터를 cartState에 mocking한다.
    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(cartState, freeShippingDummy.content));

    // mocking되었는지 확인
    expect(testSnapshot.getLoadable(cartState).valueOrThrow()).toBe(freeShippingDummy.content);

    //Assert
    const AMOUNT_EXPECTED = 100_000;
    expect(testSnapshot.getLoadable(totalAmountState).valueOrThrow()).toBe(AMOUNT_EXPECTED);
  });

  it("총 금액이 100,000원 미만인 경우 배송비가 3,000원 붙는다.", async () => {
    // Arrange
    // dummy데이터를 cartState에 mocking한다.
    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(cartState, chargeShippingDummy.content));

    // mocking되었는지 확인
    expect(testSnapshot.getLoadable(cartState).valueOrThrow()).toBe(chargeShippingDummy.content);

    //Assert
    const AMOUNT_EXPECTED = 40_000;
    const SHIPPING_FEE = 3_000;
    expect(testSnapshot.getLoadable(totalAmountState).valueOrThrow()).toBe(AMOUNT_EXPECTED + SHIPPING_FEE);
  });
});
