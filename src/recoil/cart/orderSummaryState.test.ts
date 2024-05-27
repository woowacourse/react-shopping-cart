import { snapshot_UNSTABLE } from "recoil";
import { checkedIdSetSelector } from "./checkedState";

import { mockCartItems } from "../mocks";
import { orderPriceSelector, shippingFeeSelector, totalCountSelector, totalPriceSelector } from "./orderSummaryState";

jest.mock("../../api/cartItem", () => ({ fetchCartItems: () => mockCartItems }));

describe("orderSummary 테스트", () => {
  describe("orderPriceSelector 테스트", () => {
    it("일부의 아이템만 체크되어 있을 때, 오직 체크된 아이템들만으로 계산된 가격이 얻어진다.", () => {
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set([1, 2]));
      });
      expect(snapshot.getLoadable(orderPriceSelector).contents).toBe(145000);
    });
  });

  describe("shippingFeeSelector 테스트", () => {
    it("주문 금액이 100,000원이 넘지 않을 때, 배달비는 3,000원이다.", () => {
      const PRICE_UNDER_THRESHOLD_SNAPSHOT = snapshot_UNSTABLE(({ set }) => set(checkedIdSetSelector, new Set([1])));

      expect(PRICE_UNDER_THRESHOLD_SNAPSHOT.getLoadable(shippingFeeSelector).contents).toBe(3000);
    });
    it("주문 금액이 100,000원을 넘었을 때, 배달비는 0원이다.", () => {
      const PRICE_OVER_THRESHOLD_SNAPSHOT = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set([1, 2]));
      });
      expect(PRICE_OVER_THRESHOLD_SNAPSHOT.getLoadable(shippingFeeSelector).contents).toBe(0);
    });
  });

  describe("totalPriceSelector 테스트", () => {
    it("배달비가 존재할 때, 주문 금액과 배달비를 합한 전체 금액을 반환한다.", () => {
      const PRICE_UNDER_THRESHOLD_SNAPSHOT = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set([1]));
      });
      const ORDER_PRICE = 70000;
      const EXPECTED_SHIPPING_FEE = 3000;
      const EXPECTED_RESULT = ORDER_PRICE + EXPECTED_SHIPPING_FEE;

      expect(PRICE_UNDER_THRESHOLD_SNAPSHOT.getLoadable(totalPriceSelector).contents).toBe(EXPECTED_RESULT);
    });
    it("배달비가 존재할 때, 주문 금액과 배달비를 합한 전체 금액을 반환한다.", () => {
      const PRICE_OVER_THRESHOLD_SNAPSHOT = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set([1, 2]));
      });
      const ORDER_PRICE = 145000;
      const EXPECTED_SHIPPING_FEE = 0;
      const EXPECTED_RESULT = ORDER_PRICE + EXPECTED_SHIPPING_FEE;

      expect(PRICE_OVER_THRESHOLD_SNAPSHOT.getLoadable(totalPriceSelector).contents).toBe(EXPECTED_RESULT);
    });
  });

  describe("totalCountSelector 테스트", () => {
    it("체크된 상품의 총 갯수를 요청받았을 때, 체크된 상품의 갯수 합을 반환한다.", () => {
      const ITEMS_COUNT = 5;
      const snapshot = snapshot_UNSTABLE(({ set }) => {
        set(checkedIdSetSelector, new Set([1, 2]));
      });

      expect(snapshot.getLoadable(totalCountSelector).contents).toBe(ITEMS_COUNT);
    });
  });
});
