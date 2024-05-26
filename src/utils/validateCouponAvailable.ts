import useSelectedCartItemList from '../hooks/cartItem/useSelectedCartItemList';
import usePrice from '../hooks/price/usePrice';

export const validateCouponAvailable = (coupon: Coupon) => {
  if (
    validateAvailableMinimumAmount(coupon) &&
    validateAvailableTime(coupon) &&
    validateAvailableFreeShipping(coupon) &&
    validateAvailableMinimumQuantity(coupon)
  )
    return true;

  return false;
};

const validateAvailableTime = (coupon: Coupon) => {
  const now = new Date().toTimeString().slice(0, 9);

  if (!coupon.availableTime) return true;
  if (coupon.availableTime.start <= now && now <= coupon.availableTime.end)
    return true;

  return false;
};

const validateAvailableMinimumQuantity = (coupon: Coupon) => {
  const { selectedCartItemList } = useSelectedCartItemList();

  if (
    !selectedCartItemList.some(
      (cartItem) => cartItem.quantity >= (coupon.buyQuantity ?? 0) + 1,
    )
  ) {
    return false;
  }
  return true;
};

const validateAvailableMinimumAmount = (coupon: Coupon) => {
  const { orderedPrice } = usePrice();

  if (!coupon.minimumAmount) return true;
  if (coupon.minimumAmount <= orderedPrice) return true;

  return false;
};

const validateAvailableFreeShipping = (coupon: Coupon) => {
  const { deliveryFee } = usePrice();

  if (coupon.discountType !== 'freeShipping') return true;
  if (deliveryFee === 0) return false;
  return true;
};
