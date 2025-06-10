// src/hooks/useCouponSelector.ts
import { useState, useEffect, useMemo } from 'react';
import { useCoupons } from './useCoupons';
import { useToggle } from './useToggle';
import { getBestCoupons } from '../components/Modal/utils/getBestCoupons';
import { calculateCouponDiscount } from '../components/Modal/utils/calculateCouponDiscount';
import { isCouponEnabled } from '../components/Modal/utils/isCouponEnabled';
import type { Coupon } from '../types/coupon';
import type { CartItemType } from '../types/cartItem';
import { MAX_COUPON_LENGTH } from '../constants/maxCouponLength';

export function useCouponSelector(orderAmount: number, items: CartItemType[]) {
  const { data: coupons = [] } = useCoupons();
  const [selectedCoupons, setSelectedCoupons] = useState<Coupon[]>([]);
  const [draftCoupons, setDraftCoupons] = useState<Coupon[]>([]);
  const { value: isOpen, on: open, off: close } = useToggle(false);

  const handleOpen = () => {
    setDraftCoupons(selectedCoupons);
    open();
  };
  const handleClose = () => close();

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
    close();
  };

  const totalDiscount = useMemo(
    () => selectedCoupons.reduce((sum, coupon) => sum + calculateCouponDiscount({ coupon, orderAmount, items }), 0),
    [selectedCoupons, orderAmount, items]
  );

  useEffect(() => {
    setSelectedCoupons(getBestCoupons({ coupons, orderAmount, items }));
  }, [coupons, orderAmount, items]);

  return {
    coupons,
    selectedCoupons,
    draftCoupons,
    isOpen,
    totalDiscount,
    handleOpen,
    handleClose,
    toggleCoupon,
    apply
  };
}
