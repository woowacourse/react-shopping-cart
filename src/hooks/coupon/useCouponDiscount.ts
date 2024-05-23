import { Coupon, CouponCode } from '@appTypes/shoppingCart';
import { PRICE } from '@constants/shippingCart';

import useBuyXgetYTargetItem from './useBuyXgetYTargetItem';
import useCouponFinder from './useCouponFinder';

const useCouponDiscount = () => {
  const { getCoupon } = useCouponFinder();
  const { getBuyXgetYTargetItem } = useBuyXgetYTargetItem();

  const calculateFixedDiscount = (coupon: Coupon) => {
    if (!coupon.discount) {
      console.error('coupon.discount을 찾을 수 없습니다.');
      return 0;
    }

    return coupon.discount;
  };

  const calculatePercentageDiscount = (coupon: Coupon, couponTargetPrice: number) => {
    if (!coupon.discount) {
      console.error('coupon.discount을 찾을 수 없습니다.');

      return 0;
    }

    return Math.floor((couponTargetPrice * coupon.discount) / 100);
  };

  const calculateBuyXgetYDiscount = (): number => {
    const targetItem = getBuyXgetYTargetItem();
    if (!targetItem) return 0;

    return targetItem.product.price;
  };

  /**
   * 쿠폰 적용 대상 금액에 대해 쿠폰 적용에 따른 할인 금액을 반환하는 훅
   * @param couponCode : 적용되는 쿠폰의 코드
   * @param couponTargetPrice  : 쿠폰 적용 대상인 금액
   * @returns : 할인 금액
   */
  const calculateCouponDiscount = (couponCode: CouponCode, couponTargetPrice?: number) => {
    const coupon = getCoupon(couponCode);

    switch (coupon.discountType) {
      case 'fixed':
        return calculateFixedDiscount(coupon);

      case 'buyXgetY':
        return calculateBuyXgetYDiscount();

      case 'freeShipping':
        return PRICE.shippingFee.basic;

      case 'percentage':
        return calculatePercentageDiscount(coupon, couponTargetPrice ?? 0);

      default:
        return 0;
    }
  };

  return { calculateCouponDiscount };
};

export default useCouponDiscount;
