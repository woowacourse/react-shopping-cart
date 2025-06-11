import { useState, useEffect } from 'react';
import { useCoupons } from './useCoupons';
import { getBestCoupons } from '../components/Modal/utils/getBestCoupons';
import { isCouponEnabled } from '../components/Modal/utils/isCouponEnabled';
import type { Coupon } from '../types/coupon';
import type { CartItemType } from '../types/cartItem';
import { MAX_COUPON_LENGTH } from '../constants/maxCouponLength';

export function useCouponSelector(orderAmount: number, items: CartItemType[]) {
  const { data: coupons } = useCoupons();
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [draftCoupons, setDraftCoupons] = useState<Coupon[]>([]);

  const setCoupons = () => {
    setDraftCoupons(selectedCoupons);
  };

  const toggleCoupon = (coupon: Coupon) => {
    if (!isCouponEnabled({ coupon, orderAmount, items })) return;

    if (draftCoupons.some((x) => x.id === coupon.id)) {
      setDraftCoupons((prev) => prev.filter((x) => x.id !== coupon.id));
      return;
    }

    if (draftCoupons.length >= MAX_COUPON_LENGTH) return;
    setDraftCoupons((prev) => [...prev, coupon]);
  };

  const apply = () => {
    setSelectedCoupons(draftCoupons);
  };

  useEffect(() => {
    setSelectedCoupons(getBestCoupons({ coupons: coupons ?? [], orderAmount, items }));
  }, [coupons, orderAmount, items]);

  return {
    coupons,
    selectedCoupons,
    draftCoupons,
    toggleCoupon,
    setCoupons,
    apply
  };
}
