import { calculateBogoDiscount } from '../../components/CartItemList/calculate';
import { Coupon } from '../../types/response';
import { getShippingInfoFromStorage } from '../storage/storage';

const FREE_DELIVERY_THRESHOLD = 100000;
const DELIVERY_FEE = 3000;
const EXTRA_REMOTE_FEE = 3000;

export const calculateTotalDiscount = (selectedCoupons: Coupon[], orderAmount: number): number => {
  const { isRemoteArea } = getShippingInfoFromStorage();
  const baseFee = orderAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const extraFee = isRemoteArea ? EXTRA_REMOTE_FEE : 0;
  const originalDeliveryFee = baseFee + extraFee;
  const isFreeShippingCouponApplied = selectedCoupons.find((c) => c.discountType === 'freeShipping');
  const discountedDeliveryFee = isFreeShippingCouponApplied ? 0 : originalDeliveryFee;
  const bogoDiscount = selectedCoupons.find((c) => c.discountType === 'buyXgetY') ? calculateBogoDiscount() : 0;

  return (
    selectedCoupons.reduce((acc, cur) => acc + (cur.discountType === 'fixed' && cur.discount ? cur.discount : 0), 0) +
    (originalDeliveryFee - discountedDeliveryFee) +
    bogoDiscount
  );
};
