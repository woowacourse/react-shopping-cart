import { useRecoilValue } from 'recoil';
import { CouponType } from '../components/type';
import { isDatePassed } from './util/isDatePassed';
import {
  selectedCartItemsSelector,
  shippingFeeSelector,
  totalOrderAmountSelector,
} from '../recoil/cartItems';

const useCouponAvailable = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const cartItemsBuyQuantity = useRecoilValue(selectedCartItemsSelector);

  const isOverMinimumAmount = (minimumAmount: number) => {
    return totalOrderAmount > minimumAmount;
  };

  const isShippingFee = () => {
    return shippingFee !== 0;
  };

  const isAvailableTime = (start: string, end: string) => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0, 10);

    const startTime = new Date(`${currentDate}T${start}`);
    const endTime = new Date(`${currentDate}T${end}`);

    return now >= startTime && now < endTime;
  };

  const isOverCertainQuantity = (minQuantity: number) => {
    const bulkCartItems = cartItemsBuyQuantity.filter((cartItem) => {
      const quantity = cartItem.quantity;
      return quantity >= minQuantity;
    });

    return bulkCartItems.length > 0;
  };

  const isCouponAvailable = (coupon: CouponType) => {
    let condition = false;
    if (isDatePassed(coupon.expirationDate)) false;
    if (coupon.minimumAmount) {
      condition = isOverMinimumAmount(coupon.minimumAmount);
    }
    if (coupon.availableTime) {
      condition = isAvailableTime(
        coupon.availableTime.start,
        coupon.availableTime.end,
      );
    }
    if (coupon.buyQuantity && coupon.getQuantity) {
      condition = isOverCertainQuantity(
        coupon.buyQuantity + coupon.getQuantity,
      );
    }
    if (coupon.discountType === 'freeShipping') {
      condition = isShippingFee();
    }
    return condition;
  };

  return { isCouponAvailable };
};

export default useCouponAvailable;
