import { Coupon } from '../type';
import { useState } from 'react';

export default function useCoupons(defaultCoupon: Coupon[] = []) {
  const MAX_COUPON_NUMBER = 2;

  const [coupons, setCoupons] = useState<Coupon[]>(defaultCoupon);

  const isSelectedCoupon = (targetCoupon: Coupon) =>
    coupons.some((coupon) => coupon.id === targetCoupon.id);

  const addCoupon = (targetCoupon: Coupon) => {
    if (isSelectedCoupon(targetCoupon)) return;
    if (coupons.length >= MAX_COUPON_NUMBER) return;
    setCoupons([...coupons, targetCoupon]);
  };

  const deleteCoupon = (targetCoupon: Coupon) => {
    const couponIndex = coupons.findIndex((coupon) => coupon.id === targetCoupon.id);
    if (couponIndex === -1) return;
    const nextCoupons = [...coupons];
    nextCoupons.splice(couponIndex, 1);
    setCoupons(nextCoupons);
  };

  const IS_ADDABLE = coupons.length < MAX_COUPON_NUMBER;

  return { coupons, setCoupons, isSelectedCoupon, addCoupon, deleteCoupon, IS_ADDABLE };
}
