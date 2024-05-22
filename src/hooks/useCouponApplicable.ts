import { useRecoilValue } from 'recoil';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/atoms';
import { cartOrderTotalPriceSelector } from '../recoil/CartItem/selectors/selectors';
import {
  isCouponExpired,
  isCouponMinimumAmount,
  isCouponAvaliableTime,
  isCouponAvaliableQuantity,
} from '../utils/couponValidator';
import { Coupon } from '../types/Coupon.type';

const useCouponApplicable = () => {
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);
  const totalPrice = useRecoilValue(cartOrderTotalPriceSelector);

  const isCouponApplicable = (coupon: Coupon) => {
    const now = new Date(2024, 3, 20, 4, 30, 30);

    if (isCouponExpired(coupon.expirationDate, now)) return false;

    if (coupon.minimumAmount && !isCouponMinimumAmount(coupon.minimumAmount, totalPrice)) return false;

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
