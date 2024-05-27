import { useCouponFinder } from '../useCouponFinder/useCouponFinder';
import { useCouponValidator } from '../useCouponValidator/useCouponValidator';
import { Coupon } from '../../types/coupon';
import { useRecoilValue } from 'recoil';
import { checkedCartItems } from '../../recoil/selectors/selectors';

export const useCouponApplicabilityChecker = () => {
  const { findCouponByCode } = useCouponFinder();
  const { isCouponValid } = useCouponValidator();
  const cartItems = useRecoilValue(checkedCartItems);

  const isCouponApplicable = (coupon: Coupon, totalAmount: number, now: Date = new Date()) => {
    const targetCoupon = findCouponByCode(coupon.code);
    if (!targetCoupon || !isCouponValid(targetCoupon)) return false;

    if (coupon.code === 'BOGO') {
      return cartItems.some((item) => item.quantity >= 3);
    }

    if (targetCoupon.minimumAmount && totalAmount < targetCoupon.minimumAmount) {
      return false;
    }

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] = targetCoupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end.split(':').map(Number);

      const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startHour, startMinute, startSecond);

      const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHour, endMinute, endSecond);

      if (now < startTime || now > endTime) {
        return false;
      }
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
