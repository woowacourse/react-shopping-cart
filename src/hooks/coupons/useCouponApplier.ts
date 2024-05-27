import { COUPON, COUPON_DISCOUNT_TYPE } from '../../constants/constants';
import { Coupon } from '../../api/get/getCoupons';
import { ORDER } from '../../constants/constants';
import { selectedCartItems } from '../../recoil/atoms';
import { priceInfoStore } from '../../recoil/selectors';
import { useRecoilValue } from 'recoil';
import useCouponValidator from './useCouponValidator';

const useCouponApplier = () => {
  const selectedItems = useRecoilValue(selectedCartItems);
  const priceInfo = useRecoilValue(priceInfoStore);
  const { isValidCoupon } = useCouponValidator();

  const isCouponUsable = (coupon: Coupon, orderPrice: number, now: Date = new Date()) => {
    if (!isValidCoupon(coupon)) return false;

    if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) return false;

    if (coupon.discountType === COUPON_DISCOUNT_TYPE.BUY_X_GET_Y) {
      return selectedItems.some(selectedItem => {
        return selectedItem.quantity >= COUPON.BOGO_BUY_QUANTITY;
      });
    }

    if (coupon.discountType === COUPON_DISCOUNT_TYPE.FREE_SHIPPING) {
      return !(priceInfo.order >= ORDER.SHIPPING_FREE_PRICE);
    }

    if (coupon.availableTime) {
      const [startHour, startMinute, startSecond] = coupon.availableTime.start
        .split(':')
        .map(Number);

      const [endHour, endMinute, endSecond] = coupon.availableTime.end.split(':').map(Number);

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

  return {
    isCouponUsable,
  };
};

export default useCouponApplier;
