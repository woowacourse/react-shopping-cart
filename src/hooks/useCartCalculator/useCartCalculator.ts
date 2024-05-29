import { useRecoilValue } from "recoil";
import { couponUsedAtom } from "../../recoil/atom/atom";
import { orderPriceSelector, shippingFeeSelector } from "../../recoil/selector/selector";
import { useDiscountCalculator } from "../useDiscountCalculator/useDiscountCalculator";
import useSortedCheckedCoupons from "../useSortCheckedCoupons/useSortCheckedCoupons";

export const useCartCalculator = () => {
  const orderPrice = useRecoilValue(orderPriceSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const couponUsed = useRecoilValue(couponUsedAtom);

  const { sortedCoupons } = useSortedCheckedCoupons();
  const { calculateDiscountAmount } = useDiscountCalculator();

  const calculateCartTotal = () => {
    return orderPrice + shippingFee;
  };

  const calculateCouponTotal = () => {
    return sortedCoupons.reduce(
      (acc, coupon) => {
        const discountAmount = calculateDiscountAmount(coupon, acc.currentOrderPrice);
        acc.currentOrderPrice -= discountAmount;
        acc.totalDiscount += discountAmount;
        return acc;
      },
      { totalDiscount: 0, currentOrderPrice: orderPrice }
    ).totalDiscount;
  };

  const calculateTotalWithCoupon = () => {
    const cartTotal = calculateCartTotal();
    const couponTotal = couponUsed ? calculateCouponTotal() : 0;
    return cartTotal - couponTotal;
  };

  return {
    calculateCartTotal,
    calculateCouponTotal,
    calculateTotalWithCoupon,
  };
};
