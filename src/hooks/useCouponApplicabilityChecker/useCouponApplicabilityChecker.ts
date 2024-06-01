import { useCouponFinder } from '../useCouponFinder/useCouponFinder';
import { useCouponValidator } from '../useCouponValidator/useCouponValidator';
import { Coupon } from '../../types/coupon';
import { useRecoilValue } from 'recoil';
import { checkedCartItems } from '../../recoil/selectors/selectors';
import { isTimeValid } from '../../utils/time';

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

    if (targetCoupon.availableTime && !isTimeValid(targetCoupon.availableTime, now)) {
      return false;
    }

    return true;
  };

  return {
    isCouponApplicable,
  };
};
