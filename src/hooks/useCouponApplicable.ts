import { useRecoilValue } from 'recoil';
import { selectedCartItemListState } from 'recoil/CartItem/atoms/atoms';
import { totalOrderPriceSelector } from 'recoil/CartItem/selectors/selectors';
import {
  isCouponValid,
  isCouponAvailableAmount,
  isCouponAvailableTime,
  isCouponAvailableQuantity,
} from 'utils/coupon/couponValidator/couponValidator';
import { getKoreanTime } from 'utils/time';
import { Coupon } from 'types/Coupon.type';

const useCouponApplicable = () => {
  const selectedCartItemList = useRecoilValue(selectedCartItemListState);
  const totalOrderPrice = useRecoilValue(totalOrderPriceSelector);

  const isCouponApplicable = (coupon: Coupon) => {
    const now = getKoreanTime();

    if (!isCouponValid(coupon.expirationDate, now)) return false;

    if (coupon.minimumAmount && !isCouponAvailableAmount(coupon.minimumAmount, totalOrderPrice)) return false;

    if (coupon.availableTime && !isCouponAvailableTime(coupon.availableTime, now)) return false;

    if (
      coupon.buyQuantity &&
      coupon.getQuantity &&
      !isCouponAvailableQuantity(selectedCartItemList, coupon.buyQuantity, coupon.getQuantity)
    ) {
      return false;
    }

    return true;
  };

  return { isCouponApplicable };
};

export default useCouponApplicable;
