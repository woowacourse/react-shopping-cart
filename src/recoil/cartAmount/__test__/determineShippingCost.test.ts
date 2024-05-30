import { determineShippingCost } from "../determineShippingCost";
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  SHIPPING_COST_FOR_REMOTE,
} from "../../../constants/pricing";

describe("determineShippingCost", () => {
  test("주문 금액이 0인 경우 0을 반환한다.", () => {
    const shippingCost = determineShippingCost(0);
    expect(shippingCost).toBe(0);
  });

  test(`주문 금액이 기준 금액(${FREE_SHIPPING_THRESHOLD.toLocaleString()})보다 작은 경우 ${SHIPPING_COST.toLocaleString()}(배송 금액)를 반환한다.`, () => {
    const shippingCost = determineShippingCost(FREE_SHIPPING_THRESHOLD - 1);
    expect(shippingCost).toBe(SHIPPING_COST);
  });

  test(`주문 금액이 기준 금액(${FREE_SHIPPING_THRESHOLD.toLocaleString()})과 같거나 큰 경우 0을 반환한다.`, () => {
    const shippingCost1 = determineShippingCost(FREE_SHIPPING_THRESHOLD);
    const shippingCost2 = determineShippingCost(FREE_SHIPPING_THRESHOLD + 1);

    expect(shippingCost1).toBe(0);
    expect(shippingCost2).toBe(0);
  });

  test(`산간 지역일 경우 산간 지역 배송 금액을 반환한다.`, () => {
    const shippingCost = determineShippingCost(FREE_SHIPPING_THRESHOLD - 1, true);
    expect(shippingCost).toBe(SHIPPING_COST_FOR_REMOTE);
  });
});
