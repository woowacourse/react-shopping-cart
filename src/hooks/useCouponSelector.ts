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
  const [selected, setSelected] = useState<Coupon[]>([]);
  const [temp, setTemp] = useState<Coupon[]>([]);
  const { value: isOpen, on: open, off: close } = useToggle(false);

  const handleOpen = () => {
    setTemp(selected);
    open();
  };
  const handleClose = () => close();

  const toggleCoupon = (coupon: Coupon) => {
    if (!isCouponEnabled({ coupon, orderAmount, items })) return;
    setTemp((prev) =>
      prev.some((x) => x.id === coupon.id)
        ? prev.filter((x) => x.id !== coupon.id)
        : prev.length < MAX_COUPON_LENGTH
        ? [...prev, coupon]
        : prev
    );
  };

  const apply = () => {
    setSelected(temp);
    close();
  };

  const totalDiscount = useMemo(
    () => selected.reduce((sum, coupon) => sum + calculateCouponDiscount({ coupon, orderAmount, items }), 0),
    [selected, orderAmount, items]
  );

  useEffect(() => {
    setSelected(getBestCoupons({ coupons, orderAmount, items }));
  }, [coupons, orderAmount, items]);

  return {
    coupons,
    selected,
    temp,
    isOpen,
    totalDiscount,
    handleOpen,
    handleClose,
    toggleCoupon,
    apply
  };
}
