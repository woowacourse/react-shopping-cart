import { Coupon } from "@/apis/coupon/coupon.type";
import useSelectedIds from "@/shared/hooks/useSelectedItem";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { createCouponDisabledChecker } from "../utils/createCouponDisabledChecker";
import { getIsCouponDisabled } from "../utils/getCouponDisabled";
import { getCouponDiscountAmount } from "../utils/getCouponDiscountAmount";
import { getBestCouponCombination } from "../utils/getBestCouponCombination";
import { MAX_SELECTED_COUPON_COUNT } from "@/domains/constants/coupon";

type UseCouponPrams = {
  orderList: CartItemType[];
  couponList: Coupon[];
  deliveryPrice: number;
};

export const useCoupon = ({
  orderList,
  couponList,
  deliveryPrice,
}: UseCouponPrams) => {
  const availableCoupons = couponList.filter(
    (coupon) => !getIsCouponDisabled(coupon, orderList)
  );
  const bestCombo = getBestCouponCombination({
    availableCoupons,
    orderList,
    deliveryPrice,
    couponCount: MAX_SELECTED_COUPON_COUNT,
  });

  const { getIsSelectedId, toggleSelectedId, getSelectedIdsCount } =
    useSelectedIds(new Set([...bestCombo].map((coupon) => coupon.id)));

  const getIsCouponIdDisabled = createCouponDisabledChecker({
    notAvailableCoupons: couponList.filter((coupon) =>
      getIsCouponDisabled(coupon, orderList)
    ),
    notSelectedCoupons: couponList.filter(({ id }) => !getIsSelectedId(id)),
    isMaxSelectedCoupon: getSelectedIdsCount() >= MAX_SELECTED_COUPON_COUNT,
  });

  const selectedCoupons = availableCoupons.filter((coupon) =>
    getIsSelectedId(coupon.id)
  );
  const discountAmount = selectedCoupons.reduce(
    (total, coupon) =>
      total + getCouponDiscountAmount({ coupon, orderList, deliveryPrice }),
    0
  );

  return {
    getIsSelectedId,
    toggleSelectedId,
    getIsCouponIdDisabled,
    discountAmount,
  };
};
