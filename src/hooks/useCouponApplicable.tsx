import { useRecoilValue } from 'recoil';
import { allCheckedCoupons, totalPriceSelector } from '../recoil/selectors';
import { Coupon } from '../types/coupon';
const isCouponExpired = (expirationDate: string) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  return expiration < today;
};

const useCouponApplicable = () => {
  const currentCheckedCoupon = useRecoilValue(allCheckedCoupons);
  const { totalAmount } = useRecoilValue(totalPriceSelector);
  const isCouponApplicable = (
    coupon: Coupon,
    couponDetail: boolean,
    now: Date = new Date(),
  ) => {
    const targetCoupon = coupon;
    if (!couponDetail && currentCheckedCoupon.length >= 2) {
      return false;
    }

    if (!targetCoupon || isCouponExpired(targetCoupon.expirationDate))
      return false;

    if (
      targetCoupon.minimumAmount &&
      totalAmount < targetCoupon.minimumAmount
    ) {
      return false;
    }

    if (targetCoupon.availableTime) {
      const [startHour, startMinute, startSecond] =
        targetCoupon.availableTime.start.split(':').map(Number);

      const [endHour, endMinute, endSecond] = targetCoupon.availableTime.end
        .split(':')
        .map(Number);

      const startTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        startHour,
        startMinute,
        startSecond,
      );

      const endTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        endHour,
        endMinute,
        endSecond,
      );

      if (now < startTime || now > endTime) {
        return false;
      }
    }
    return true;
  };
  return { isCouponApplicable };
};

export default useCouponApplicable;
