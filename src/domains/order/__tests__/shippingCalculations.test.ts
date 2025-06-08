import { calculateShippingFee } from "../calculations/shippingCalculations";
import { DEFAULT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD } from "../constants";

describe("shippingCalculations 테스트", () => {
  describe("calculateShippingFee 함수", () => {
    it("주문 금액이 무료배송 기준 금액 이상이면 배송비는 0원이다", () => {
      expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD)).toBe(0);
      expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD + 1)).toBe(0);
      expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD * 2)).toBe(0);
    });

    it("주문 금액이 무료배송 기준 금액 미만이면 기본 배송비가 적용된다", () => {
      expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD - 1)).toBe(
        DEFAULT_SHIPPING_FEE
      );
      expect(calculateShippingFee(FREE_SHIPPING_THRESHOLD / 2)).toBe(
        DEFAULT_SHIPPING_FEE
      );
    });

    it("주문 금액이 0이면 배송비도 0원이다", () => {
      expect(calculateShippingFee(0)).toBe(0);
    });
  });
});
