import { Coupon } from '../../types/response';
import { getOrderItemsFromStorage, getShippingInfoFromStorage } from '../../utils/storage/storage';
import { DELIVERY_FEE, EXTRA_REMOTE_FEE, FREE_DELIVERY_THRESHOLD } from '../../constants/domain';

export const calculateTotalDiscount = (selectedCoupons: Coupon[], orderAmount: number): number => {
  const { isRemoteArea } = getShippingInfoFromStorage();

  const baseFee = orderAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const extraFee = isRemoteArea ? EXTRA_REMOTE_FEE : 0;
  const originalDeliveryFee = baseFee + extraFee;

  const { discountSum, hasFreeShipping } = selectedCoupons.reduce(
    (acc, coupon) => {
      switch (coupon.discountType) {
        case 'fixed':
          return {
            ...acc,
            discountSum: acc.discountSum + (coupon.discount ?? 0)
          };
        case 'percentage':
          return {
            ...acc,
            discountSum: acc.discountSum + Math.floor((orderAmount * (coupon.discount ?? 0)) / 100)
          };
        case 'freeShipping':
          return {
            ...acc,
            hasFreeShipping: true
          };
        case 'buyXgetY':
          return {
            ...acc,
            discountSum: acc.discountSum + calculateBogoDiscount()
          };
        default:
          return acc;
      }
    },
    { discountSum: 0, hasFreeShipping: false }
  );

  const deliveryDiscount = hasFreeShipping ? originalDeliveryFee : 0;
  return discountSum + deliveryDiscount;
};

export const calculateBogoDiscount = () => {
  const items = getOrderItemsFromStorage();
  const eligibleItems = items.filter((item) => item.quantity >= 2);
  if (eligibleItems.length === 0) return 0;
  const mostExpensiveItem = eligibleItems.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
  return mostExpensiveItem.price;
};
