import { REMOTE_AREA_SHIPPING_FEE } from "../../constants/priceSetting";
import { CartItem } from "../../type/CartItem";
import { getOrderSummary } from "./getOrderSummary";

export function getOrderSummaryWithCoupon({
  selectedCartItems,
  discountAmount,
  isRemoteAreaShipping,
}: {
  selectedCartItems: CartItem[];
  discountAmount: number;
  isRemoteAreaShipping: boolean;
}) {
  const {
    selectedCartItemsLength,
    selectedCartItemsCount,
    totalPrice,
    shippingFee,
    totalPriceWithShipping,
  } = getOrderSummary({ selectedCartItems });

  const remoteAreaShippingFee = isRemoteAreaShipping
    ? REMOTE_AREA_SHIPPING_FEE
    : 0;

  return {
    selectedCartItemsLength,
    selectedCartItemsCount,
    totalPrice,
    shippingFee: shippingFee + remoteAreaShippingFee,
    totalPriceWithShipping:
      totalPriceWithShipping + remoteAreaShippingFee - discountAmount,
  };
}
