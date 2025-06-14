import { calculateBogoDiscount } from './calculate';
import { Coupon } from '../../types/response';
import { getShippingInfoFromStorage } from '../../utils/storage/storage';

const FREE_DELIVERY_THRESHOLD = 100000;
const DELIVERY_FEE = 3000;
const EXTRA_REMOTE_FEE = 3000;

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
