import { useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/atoms';
import { totalOrderPriceSelector } from '../recoil/CartItem/selectors/selectors';
import {
  isCouponExpired,
  isCouponMinimumAmount,
  isCouponAvaliableTime,
  isCouponAvaliableQuantity,
} from '../utils/coupon/couponValidator/couponValidator';
import { getKoreanTime } from '../utils/time';
import { Coupon } from '../types/Coupon.type';

const useCouponApplicable = () => {
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

  const isCouponApplicable = (coupon: Coupon) => {
    const now = getKoreanTime();

    if (isCouponExpired(coupon.expirationDate, now)) return false;

    if (coupon.minimumAmount && !isCouponMinimumAmount(coupon.minimumAmount, totalOrderPrice)) return false;

    if (coupon.availableTime && !isCouponAvaliableTime(coupon.availableTime, now)) return false;

    if (
      coupon.buyQuantity &&
      coupon.getQuantity &&
      !isCouponAvaliableQuantity(selectedCartItemList, coupon.buyQuantity, coupon.getQuantity)
    ) {
      return false;
    }

    return true;
  };

  return { isCouponApplicable };
};

export default useCouponApplicable;
