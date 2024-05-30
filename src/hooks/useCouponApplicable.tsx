import { useRecoilValue } from 'recoil';
import {
  allCheckedCouponsSelector,
  checkedItemsSelector,
  totalPriceSelector,
} from '../recoil/selectors';
import { Coupon } from '../types/coupon';
import isCouponApplicable from '../validate/validateCoupon';
import { MAX_COUPON_COUNT } from '../constants/ShoppingCart';

const useCouponApplicable = (
  coupon: Coupon,
  couponDetail: boolean,
  now: Date = new Date(),
) => {
  const currentCheckedCoupon = useRecoilValue(allCheckedCouponsSelector);
  const checkedItems = useRecoilValue(checkedItemsSelector);
  const { totalAmount } = useRecoilValue(totalPriceSelector('Default'));

  if (!couponDetail && currentCheckedCoupon.length >= MAX_COUPON_COUNT) {
    return false;
  }
  let couponApplicable = isCouponApplicable(coupon, false, totalAmount, now);

  if (coupon.buyQuantity !== undefined) {
    const isAvailableBuyXgetY = checkedItems.some(
      (value) => value.quantity > coupon.buyQuantity!,
    );
    couponApplicable = isCouponApplicable(
      coupon,
      isAvailableBuyXgetY,
      totalAmount,
      now,
    );
  }

  return couponApplicable;
};

export default useCouponApplicable;
