import { useRecoilValue } from 'recoil';
import { cartOrderTotalPriceSelector } from '../recoil/CartItem/selectors/selectors';
import { isCouponExpired, isCouponMinimumAmount, isCouponAvaliable } from '../utils/couponValidator';
import { Coupon } from '../types/Coupon.type';

const useCouponApplicable = () => {
  const totalPrice = useRecoilValue(cartOrderTotalPriceSelector);

  const isCouponApplicable = (coupon: Coupon) => {
    const now = new Date(2024, 3, 20);

    if (isCouponExpired(coupon.expirationDate, now)) return false;

    if (coupon.minimumAmount && !isCouponMinimumAmount(coupon.minimumAmount, totalPrice)) return false;

    if (coupon.availableTime && !isCouponAvaliable(coupon.availableTime, now)) return false;

    return true;
  };

  return { isCouponApplicable };
};

export default useCouponApplicable;
