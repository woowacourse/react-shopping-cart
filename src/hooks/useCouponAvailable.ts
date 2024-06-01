import { cartItemQuantityState } from '../recoil/cartItems';
import { useRecoilValue } from 'recoil';
import { CouponType } from '../components/type';
import { isDatePassed } from '../util/coupon/isDatePassed';
import {
  cartItemsIdState,
  shippingFeeSelector,
  totalOrderAmountSelector,
} from '../recoil/cartItems';

const useCouponAvailable = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);
  const cartId = useRecoilValue(cartItemsIdState);
  const cartItemsBuyQuantity = cartId.map((id) => {
    return useRecoilValue(cartItemQuantityState(id));
  });

  const isOverMinimumAmount = (minimumAmount: number) => {
    return totalOrderAmount > minimumAmount;
  };

  const isShippingFee = () => {
    return shippingFee !== 0;
  };

  const isAvailableTime = (start: string, end: string) => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTimeStr = `${hours}:${minutes}`;

    return currentTimeStr >= start && currentTimeStr < end;
  };

  const isOverCertainQuantity = (minQuantity: number) => {
    const bulkCartItems = cartItemsBuyQuantity.filter((cartItemQuantity) => {
      return cartItemQuantity >= minQuantity;
    });

    return bulkCartItems.length > 0;
  };

  const isCouponAvailable = (coupon: CouponType) => {
    let condition = false;
    if (isDatePassed(coupon.expirationDate)) return false;

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
