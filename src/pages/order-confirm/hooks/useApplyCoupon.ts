import { Coupon } from "@/apis/coupon/coupon.type";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { getBestCouponCombination } from "../utils/getBestCouponCombination";
import { MAX_SELECTED_COUPON_COUNT } from "@/domains/constants/coupon";
import { getCouponsDiscountAmount } from "../utils/getCouponsDiscountAmount";

type UseApplyCouponPrams = {
  orderList: CartItemType[];
  couponList: Coupon[];
  deliveryPrice: number;
};

export const useApplyCoupon = ({
  orderList,
  couponList,
  deliveryPrice,
}: UseApplyCouponPrams) => {
  const bestCombo = getBestCouponCombination({
    couponList,
    orderList,
    deliveryPrice,
    couponCount: MAX_SELECTED_COUPON_COUNT,
  });
  const { getIsSelectedId, updateSelectedIds } = useSelectedIds(
    new Set(bestCombo.map(({ id }) => id))
  );

  const couponDiscount = getCouponsDiscountAmount({
    couponList,
    orderList,
    deliveryPrice,
    getIsSelectedId,
  });

  return {
    applyCouponIds: updateSelectedIds,
    couponDiscount,
  };
};
