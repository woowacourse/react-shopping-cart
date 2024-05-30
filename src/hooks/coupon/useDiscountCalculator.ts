import { Coupon, CouponDiscountType } from "@/types/coupon";
// import { useRecoilValue } from "recoil";
import useCouponApplicabilityChecker from "./useCouponApplicabilityChecker";
// import { couponsByDiscountTypeSelector } from "@/recoil/coupons";
import useBuyXgetYCoupon from "@/hooks/coupon/useBuyXgetYCoupon";

const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const { getMaxPriceItem } = useBuyXgetYCoupon();
  // const couponsByDiscountType = useRecoilValue(couponsByDiscountTypeSelector);

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, price: totalAmount })) return 0;
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, price: totalAmount })) return 0;
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateTotalDiscount = (
    couponsByDiscountType: Record<CouponDiscountType, Coupon[]>,
    totalPrice: number
  ) => {
    const { buyXgetY, percentage, fixed } = couponsByDiscountType;

    const buyXgetYDiscount = buyXgetY ? getMaxPriceItem() : 0;

    const percentageDiscount = percentage
      ? percentage
          .sort((a, b) => a.discount! - b.discount!)
          .reduce(
            (acc, cur) =>
              acc + calculatePercentageDiscount(cur, totalPrice - acc),
            0
          )
      : 0;

    const fixedDiscount = fixed
      ? fixed.reduce(
          (acc, cur) => acc + calculateFixedDiscount(cur, totalPrice - acc),
          0
        )
      : 0;

    return buyXgetYDiscount + percentageDiscount + fixedDiscount;
  };

  return {
    calculateTotalDiscount,
  };
};

export default useDiscountCalculator;
