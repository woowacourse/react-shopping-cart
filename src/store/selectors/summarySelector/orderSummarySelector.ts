import {
  additionalShippingFeeAreaState,
  selectedCouponsState,
} from "@/store/atoms/atoms";

import { ADDITIONAL_SHIPPING_FEE } from "@/constants/system";
import { SummaryType } from "@/types/order.type";
import { calculateDiscountAmount } from "@/utils/calculateDiscountAmount";
import { cartSummaryState } from "./cartSummarySelector";
import { selectedItemsState } from "../selectedSelector/selectedItemsSelector";
import { selector } from "recoil";

export const orderSummaryState = selector<SummaryType>({
  key: "orderSummaryState",
  get: ({ get }) => {
    const previous = get(cartSummaryState);
    const isAdditionalShippingFeeArea = get(additionalShippingFeeAreaState);

    const selectedCoupons = get(selectedCouponsState);
    const selectedItems = get(selectedItemsState);

    const orderSummary = { ...previous };

    if (isAdditionalShippingFeeArea && previous.shippingFee !== 0) {
      orderSummary.shippingFee = previous.shippingFee + ADDITIONAL_SHIPPING_FEE;
    }

    const discountAmount = selectedCoupons.reduce((accAmount, curCoupon) => {
      accAmount =
        accAmount +
        calculateDiscountAmount({
          coupon: curCoupon,
          orderPrice: orderSummary.orderPrice,
          selectedItems,
          shippingFee: orderSummary.shippingFee,
        });
      return accAmount;
    }, 0);

    orderSummary.discount = discountAmount;

    orderSummary.totalPrice =
      orderSummary.orderPrice +
      orderSummary.shippingFee -
      orderSummary.discount;

    return orderSummary;
  },
});
