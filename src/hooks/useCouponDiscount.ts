import { useMemo } from "react";
import { useCartItemContext } from "../contexts/useCartItemContext";
import { useSelectedItems } from "./useSelectedItems";
import { Coupon } from "../apis/coupons";

export const useCouponDiscount = () => {
  const { appliedCoupons } = useCartItemContext();
  const { selectedItems } = useSelectedItems();

  const orderPrice = useMemo(() => {
    return selectedItems.reduce((acc, cartItem) => {
      return acc + cartItem.product.price * cartItem.quantity;
    }, 0);
  }, [selectedItems]);

  const couponDiscount = useMemo(() => {
    let totalDiscount = 0;

    appliedCoupons.forEach((coupon: Coupon) => {
      switch (coupon.discountType) {
        case "fixed":
          if (coupon.minimumAmount && orderPrice >= coupon.minimumAmount) {
            totalDiscount += coupon.discount || 0;
          }
          break;
      }
    });

    return totalDiscount;
  }, [appliedCoupons, orderPrice]);

  return {
    couponDiscount,
    orderPrice,
  };
};
