import { useRecoilValue } from 'recoil';
import { useCouponFinder } from './useCouponFinder';
import { useCouponValidator } from './useCouponValidator';
import { checkedCartItemsSelector } from '../store/selector/selectors';

export const useCouponApplicabilityChecker = () => {
  const checkedItem = useRecoilValue(checkedCartItemsSelector);
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();

  const isQuantityAvailable = (coupon: Coupon) => {
    if (coupon.buyQuantity && coupon.getQuantity) {
      return checkedItem.map((item) => item.quantity >= coupon.buyQuantity! + coupon.getQuantity!).some(Boolean);
    }
  };

  const isTimeAvailable = (coupon: Coupon, now: Date) => {
    if (coupon.availableTime) {
      const [startHour, startMinute, startSecond] = coupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(':').map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }
  };

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date('2024-02-22 10:00:00')) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (targetCoupon.minimumAmount && totalAmount < targetCoupon.minimumAmount) {
      return false;
    }

    if (!isQuantityAvailable(targetCoupon)) return false;

    if (!isTimeAvailable(targetCoupon, now)) return false;

    return true;
  };

  return { isCouponApplicable };
};
