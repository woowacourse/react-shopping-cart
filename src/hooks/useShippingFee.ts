import { useState } from 'react';
import {
  FREE_SHIPPING_FEE,
  REMOTE_SHIPPING_FEE,
  SHIPPING_FEE_THRESHOLD,
} from '../constants/cartConfig';
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

  const baseShippingFee =
    subtotal >= SHIPPING_FEE_THRESHOLD ? FREE_SHIPPING_FEE : REMOTE_SHIPPING_FEE;

  const remoteAreaFee = remoteArea ? REMOTE_SHIPPING_FEE : FREE_SHIPPING_FEE;

  const hasFreeShippingCoupon = selectedCoupons.some(
    (coupon) =>
      coupon.discountType === 'freeShipping' &&
      (!coupon.minimumAmount || subtotal >= coupon.minimumAmount),
  );

  const totalShippingFee = hasFreeShippingCoupon
    ? FREE_SHIPPING_FEE
    : baseShippingFee + remoteAreaFee;

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
