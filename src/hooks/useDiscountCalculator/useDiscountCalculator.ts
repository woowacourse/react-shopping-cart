import { useCouponApplicabilityChecker } from '../useCouponApplicabilityChecker/useCouponApplicabilityChecker';
import { Coupon } from '../../types/coupon';
import { calculateOrderPrice, checkedCartItems } from '../../recoil/selectors/selectors';
import { useRecoilValue } from 'recoil';

export const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const checkedItems = useRecoilValue(checkedCartItems);
  const { deliveryFee } = useRecoilValue(calculateOrderPrice);

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculateBuyXgetYDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }

    const priceList = checkedItems.map((item) => {
      if (item.quantity >= 3) return item.product.price;
      return 0;
    });

    return Math.max(...priceList);
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateFreeShippingDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable(coupon, totalAmount)) {
      return 0;
    }
    return deliveryFee;
  };

  const calculateDiscountAmount = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    if (!isCouponApplicable(coupon, totalAmount, now)) {
      return 0;
    }

    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon, totalAmount);
      case 'buyXgetY':
        return calculateBuyXgetYDiscount(coupon, totalAmount);
      case 'freeShipping':
        return calculateFreeShippingDiscount(coupon, totalAmount);
      case 'percentage':
        return calculatePercentageDiscount(coupon, totalAmount);
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
