import {
  additionalShippingFeeAreaState,
  discountAmountState,
} from "@/store/atoms/atoms";

import { ADDITIONAL_SHIPPING_FEE } from "@/constants/system";
import { RecipeType } from "@/types/recipe.type";
import { recipeState } from "../recipeSelector/recipeSelector";
import { selector } from "recoil";

export const orderSummaryState = selector<RecipeType>({
  key: "orderSummaryState",
  get: ({ get }) => {
    const previous = get(recipeState);
    const discountAmount = get(discountAmountState);
    const isAdditionalShippingFeeArea = get(additionalShippingFeeAreaState);

    const orderSummary = { ...previous };

    if (isAdditionalShippingFeeArea && previous.shippingFee !== 0) {
      orderSummary.shippingFee = previous.shippingFee + ADDITIONAL_SHIPPING_FEE;
    }

    orderSummary.discount = discountAmount;

    orderSummary.totalPrice =
      orderSummary.orderPrice +
      orderSummary.shippingFee -
      orderSummary.discount;

    return orderSummary;
  },
});
