import usePriceSelector from '../recoil/price/usePriceSelector';

export const validateCouponAvailable = (coupon: Coupon) => {
  if (
    validateAvailableMinimumAmount(coupon) &&
    validateAvailableTime(coupon) &&
    validateAvailableFreeShipping(coupon)
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

const validateAvailableMinimumAmount = (coupon: Coupon) => {
  const { orderedPrice } = usePriceSelector();

  if (!coupon.minimumAmount) return true;
  if (coupon.minimumAmount <= orderedPrice) return true;

  return false;
};

const validateAvailableFreeShipping = (coupon: Coupon) => {
  const { deliveryFee } = usePriceSelector();

  if (coupon.discountType !== 'freeShipping') return true;
  if (deliveryFee === 0) return false;
  return true;
};
