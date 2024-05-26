import {
  additionalShippingFeeAreaState,
  discountAmountState,
} from "@/store/atoms/atoms";

import { ADDITIONAL_SHIPPING_FEE } from "@/constants/system";
import { SummaryType } from "@/types/order.type";
import { cartSummaryState } from "./cartSummarySelector";
import { selector } from "recoil";

export const orderSummaryState = selector<SummaryType>({
  key: "orderSummaryState",
  get: ({ get }) => {
    const previous = get(cartSummaryState);
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
