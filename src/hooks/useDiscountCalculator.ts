import { useRecoilValue } from 'recoil';
import { cartItemsState } from '../recoil/atoms';
import { Coupon } from '../type';
import useCouponValidityChecker from './useCouponValidityChecker';

export default function useDiscountCalculator() {
  const cartItems = useRecoilValue(cartItemsState);
  const { isCouponValid } = useCouponValidityChecker();

  const getFixedDiscountAmount = (coupon: Coupon) => {
    return coupon.discount ?? 0;
  };

  const getPercentageDiscountAmount = (coupon: Coupon, currentTotalAmount: number) => {
    return Math.floor((currentTotalAmount * (coupon.discount ?? 0)) / 100);
  };

  const getFreeItemDiscountAmount = (coupon: Coupon) => {
    if (!coupon.getQuantity) return 0;
    const mostExpensiveProductPrice = Math.max(...cartItems.map((item) => item.product.price));
    return mostExpensiveProductPrice * coupon.getQuantity;
  };

  const getDiscountAmountByCoupon = (coupon: Coupon, currentTotalAmount: number) => {
    if (!isCouponValid(coupon)) {
      return 0;
    }

    switch (coupon.discountType) {
      case 'fixed':
        return getFixedDiscountAmount(coupon);
      case 'percentage':
        return getPercentageDiscountAmount(coupon, currentTotalAmount);
      case 'buyXgetY':
        return getFreeItemDiscountAmount(coupon);
      default:
        return 0;
    }
  };

  return {
    getDiscountAmountByCoupon,
  };
}
