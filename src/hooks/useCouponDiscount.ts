import { useMemo } from "react";
import { useCouponContext } from "../contexts/CouponContext";
import { useSelectedItems } from "./useSelectedItems";
import { useShippingContext } from "../contexts/ShippingContext";
import { Coupon } from "../apis/coupons";
import {
  FREE_SHIPPING_MIN_AMOUNT,
  SHIPPING_FEE,
  REMOTE_AREA_SHIPPING_FEE,
} from "../constants";
import { CartItem } from "../types/type";

export const useCouponDiscount = () => {
  const { appliedCoupons } = useCouponContext();
  const { selectedItems } = useSelectedItems();
  const { isRemoteAreaShipping } = useShippingContext();

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
          const currentShippingFee =
            orderPrice >= FREE_SHIPPING_MIN_AMOUNT
              ? isRemoteAreaShipping
                ? REMOTE_AREA_SHIPPING_FEE
                : 0
              : actualShippingFee;

          totalDiscount += currentShippingFee;
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

const calculateBuyXGetYDiscount = (
  selectedItems: CartItem[],
  coupon: Coupon
): number => {
  if (!coupon.buyQuantity || !coupon.getQuantity) {
    return 0;
  }

  const requiredQuantity = coupon.buyQuantity + coupon.getQuantity;

  const eligibleItems = selectedItems.filter(
    (item) => item.quantity >= requiredQuantity
  );

  if (eligibleItems.length === 0) {
    return 0;
  }

  let maxPrice = 0;
  eligibleItems.forEach((item) => {
    if (item.product.price > maxPrice) {
      maxPrice = item.product.price;
    }
  });

  return maxPrice;
};
