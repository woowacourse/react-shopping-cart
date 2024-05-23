import { Coupon } from '@appTypes/orderConfirm';
import { PRICE } from '@constants/shippingCart';
import useOrderCosts from '@hooks/shoppingCart/useOrderCosts';

import { useCouponValidator } from '../useCouponValidator/useCouponValidator';

export const useConfirmCouponApplication = () => {
  const isCouponValid = useCouponValidator();
  const { beforeDiscountTotalPrice, shippingPrice } = useOrderCosts();

  const isApplicabilityCoupon = (coupon: Coupon, now: Date = new Date()) => {
    if (!coupon || !isCouponValid(coupon)) return false;

    if (coupon?.minimumAmount && beforeDiscountTotalPrice < coupon?.minimumAmount) {
      return false;
    }

    if (coupon.discountType === 'freeShipping' && shippingPrice === PRICE.shippingFee.free) return false;

    if (coupon?.availableTime) {
      const [startHour, startMinute, startSecond] = coupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(':').map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour + 17, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return isApplicabilityCoupon;
};
