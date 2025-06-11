import { useCallback, useMemo } from "react";
import { Coupon } from "../apis/coupons";
import { isUnavailableTime, isCouponExpired } from "../utils/dateUtils";
import { useSelectedItems } from "./useSelectedItems";
import { FREE_SHIPPING_MIN_AMOUNT } from "../constants";
import { useShippingContext } from "../contexts/ShippingContext";

export const useCouponValidation = () => {
  const { selectedItems } = useSelectedItems();
  const { isRemoteAreaShipping } = useShippingContext();

  const orderPrice = useMemo(() => {
    return selectedItems.reduce((acc, cartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
    }, 0);
  }, [selectedItems]);

  const isCouponValid = useCallback(
    (coupon: Coupon): boolean => {
      if (isCouponExpired(coupon.expirationDate)) {
        return false;
      }

      if (coupon.availableTime && isUnavailableTime(coupon.availableTime)) {
        return false;
      }

      switch (coupon.discountType) {
        case "fixed":
          return !coupon.minimumAmount || orderPrice >= coupon.minimumAmount;
        case "freeShipping":
          if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) {
            return false;
          }

          if (orderPrice >= FREE_SHIPPING_MIN_AMOUNT) {
            return isRemoteAreaShipping;
          }

          return true;
        case "percentage":
          return true;
        case "buyXgetY": {
          if (!coupon.buyQuantity || !coupon.getQuantity) return false;
          const requiredQuantity = coupon.buyQuantity + coupon.getQuantity;
          return selectedItems.some(
            (item) => item.quantity >= requiredQuantity
          );
        }
        default:
          throw new Error(`Unknown discount type: ${coupon.discountType}`);
      }
    },
    [selectedItems, orderPrice]
  );

  const getValidCoupons = useCallback(
    (coupons: Coupon[]): Coupon[] => {
      return coupons.filter(isCouponValid);
    },
    [isCouponValid]
  );

  return {
    orderPrice,
    isCouponValid,
    getValidCoupons,
  };
};
