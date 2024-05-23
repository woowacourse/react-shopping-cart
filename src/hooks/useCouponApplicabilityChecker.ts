import { useCouponValidator } from './useCouponValidator';
import { Coupon } from '../types/Coupon.type';
import { useCalculateDeliveryFee } from './useCalculateDeliveryFee';

export const useCouponApplicabilityChecker = () => {
  const { isCouponValid } = useCouponValidator();
  const { deliveryFee } = useCalculateDeliveryFee();

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    if (!coupon || !isCouponValid(coupon)) return false;

    if (coupon.minimumAmount && totalAmount < coupon.minimumAmount) {
      return false;
    }

    if (coupon.availableTime) {
      const [startHour, startMinute, startSecond] = coupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(':').map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    if (coupon.discountType === 'freeShipping') {
      if (deliveryFee === 0) return false;
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
