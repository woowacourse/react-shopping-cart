import { useState } from 'react';
import { REMOTE_SHIPPING_FEE, SHIPPING_FEE_THRESHOLD } from '../constants/cartConfig';
import { Coupon } from '../types/coupon';

interface UseShippingFeeProps {
  subtotal: number;
  selectedCoupons: Coupon[];
}

interface UseShippingFeeReturn {
  remoteArea: boolean;
  toggleRemoteArea: () => void;
  baseShippingFee: number;
  remoteAreaFee: number;
  totalShippingFee: number;
  hasFreeShippingCoupon: boolean;
}

export const useShippingFee = ({
  subtotal,
  selectedCoupons,
}: UseShippingFeeProps): UseShippingFeeReturn => {
  const [remoteArea, setRemoteArea] = useState(false);

  const baseShippingFee = subtotal >= SHIPPING_FEE_THRESHOLD ? 0 : 3000;

  const remoteAreaFee = remoteArea ? REMOTE_SHIPPING_FEE : 0;

  const hasFreeShippingCoupon = selectedCoupons.some(
    (coupon) =>
      coupon.discountType === 'freeShipping' &&
      (!coupon.minimumAmount || subtotal >= coupon.minimumAmount),
  );

  const totalShippingFee = hasFreeShippingCoupon ? 0 : baseShippingFee + remoteAreaFee;

  const toggleRemoteArea = () => {
    setRemoteArea((prev) => !prev);
  };

  return {
    remoteArea,
    toggleRemoteArea,
    baseShippingFee,
    remoteAreaFee,
    totalShippingFee,
    hasFreeShippingCoupon,
  };
};
