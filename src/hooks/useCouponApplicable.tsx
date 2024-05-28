import { useRecoilValue } from 'recoil';
import {
  allCheckedCouponsSelector,
  checkedItemsSelector,
  totalPriceSelector,
} from '../recoil/selectors';
import { Coupon } from '../types/coupon';
import isCouponApplicable from '../validate/validateCoupon';

const useCouponApplicable = (
  coupon: Coupon,
  couponDetail: boolean,
  now: Date = new Date(),
) => {
  const currentCheckedCoupon = useRecoilValue(allCheckedCouponsSelector);
  const isAvailableBuyXgetY = useRecoilValue(checkedItemsSelector).some(
    (value) => value.quantity > 2,
  );
  const { totalAmount } = useRecoilValue(totalPriceSelector('Default'));
  if (!couponDetail && currentCheckedCoupon.length >= 2) {
    return false;
  }
  const couponApplicable = isCouponApplicable(
    coupon,
    isAvailableBuyXgetY,
    totalAmount,
    now,
  );

  return couponApplicable;
};

export default useCouponApplicable;
