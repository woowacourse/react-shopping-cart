import { selector } from "recoil";
import { cartItemsState } from "../cartItems";
import { sumCartOrderAmount } from "../../utils/domain/sumCartOrderAmount";
import { determineShippingCost } from "../../utils/domain/determineShippingCost";

export interface CartAmount {
  orderAmount: number;
  shippingCost: number;
  totalOrderAmount: number;
}

export const cartAmountState = selector<CartAmount>({
  key: "cartAmountState",
  get: async ({ get }) => {
    const cartItems = get(cartItemsState);

    const orderAmount = sumCartOrderAmount(cartItems);
    const shippingCost = determineShippingCost(orderAmount);
    const totalOrderAmount = orderAmount + shippingCost;

    return {
      orderAmount,
      shippingCost,
      totalOrderAmount,
    };
  },
});
