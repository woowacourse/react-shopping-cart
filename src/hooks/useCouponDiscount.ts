import { useMemo } from "react";
import { useCouponContext } from "../contexts/CouponContext";
import { useSelectedItems } from "./useSelectedItems";
import { Coupon } from "../apis/coupons";
import { SHIPPING_FEE, REMOTE_AREA_SHIPPING_FEE } from "../constants";
import {
  calculateBuyXGetYDiscount,
  calculateFreeShippingDiscount,
} from "../utils/discounts";

export const useCouponDiscount = (isRemoteAreaShipping: boolean) => {
  const { appliedCoupons } = useCouponContext();
  const { selectedItems } = useSelectedItems();

  const orderPrice = useMemo(() => {
    return selectedItems.reduce((acc, cartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
    }, 0);
  }, [selectedItems]);

  const actualShippingFee = useMemo(() => {
    const baseShippingFee = SHIPPING_FEE;
    const remoteAreaFee = isRemoteAreaShipping ? REMOTE_AREA_SHIPPING_FEE : 0;
    return baseShippingFee + remoteAreaFee;
  }, [isRemoteAreaShipping]);

  const couponDiscount = useMemo(() => {
    let totalDiscount = 0;

    appliedCoupons.forEach((coupon: Coupon) => {
      switch (coupon.discountType) {
        case "fixed":
          totalDiscount += coupon.discount || 0;
          break;

        case "percentage":
          totalDiscount += Math.floor(
            (orderPrice * (coupon.discount || 0)) / 100
          );
          break;

        case "buyXgetY":
          totalDiscount += calculateBuyXGetYDiscount(selectedItems, coupon);
          break;

        case "freeShipping": {
          totalDiscount += calculateFreeShippingDiscount(
            orderPrice,
            isRemoteAreaShipping
          );
          break;
        }
      }
    });

    return totalDiscount;
  }, [appliedCoupons, orderPrice, selectedItems, actualShippingFee]);

  return {
    couponDiscount,
    orderPrice,
  };
};
