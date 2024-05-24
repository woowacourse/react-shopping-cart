import { useRecoilValue } from 'recoil';

import { selectedCouponListState } from '../recoil/Coupon/atoms/selectedCouponListState';
import { useCalculateDeliveryFee } from './useCalculateDeliveryFee';

import type { Coupon } from '../types/Coupon.type';

export const useCouponCheck = () => {
  const { deliveryFee } = useCalculateDeliveryFee();
  const selectedCouponList = useRecoilValue(selectedCouponListState);

  const isCouponExpired = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    return expiration < today;
  };

  const isCouponValid = (coupon: Coupon) => {
    return !isCouponExpired(coupon.expirationDate);
  };

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    if (selectedCouponList.length === 2 && !selectedCouponList.find((item) => item.id === coupon.id)) return false;
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
    isCouponValid,
    isCouponApplicable,
  };
};
