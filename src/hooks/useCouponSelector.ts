// src/hooks/useCouponSelector.ts
import { useState, useEffect, useMemo } from 'react';
import { useCoupons } from './useCoupons';
import { useToggle } from './useToggle';
import { getBestCoupons } from '../components/Modal/utils/getBestCoupons';
import { calculateCouponDiscount } from '../components/Modal/utils/calculateCouponDiscount';
import { isCouponDisabled } from '../components/Modal/utils/isCouponDisabled';
import type { Coupon } from '../types/coupon';
import type { CartItemType } from '../types/cartItem';
import { MAX_COUPON_LENGTH } from '../constants/maxCouponLength';

export function useCouponSelector(orderAmount: number, items: CartItemType[], baseDeliveryFee: number) {
  const { data: coupons = [] } = useCoupons();
  const [selected, setSelected] = useState<Coupon[]>([]);
  const [temp, setTemp] = useState<Coupon[]>([]);
  const { value: isOpen, on: open, off: close } = useToggle(false);

  const handleOpen = () => {
    setTemp(selected);
    open();
  };
  const handleClose = () => close();

  const toggleCoupon = (c: Coupon) => {
    if (isCouponDisabled(c, orderAmount, items)) return;
    setTemp((prev) =>
      prev.some((x) => x.id === c.id)
        ? prev.filter((x) => x.id !== c.id)
        : prev.length < MAX_COUPON_LENGTH
        ? [...prev, c]
        : prev
    );
  };

  const apply = () => {
    setSelected(temp);
    close();
  };

  const totalDiscount = useMemo(
    () => selected.reduce((sum, c) => sum + calculateCouponDiscount(c, orderAmount, items, baseDeliveryFee), 0),
    [selected, orderAmount, items, baseDeliveryFee]
  );

  useEffect(() => {
    setSelected(getBestCoupons(coupons, orderAmount, items, baseDeliveryFee));
    // baseDeliveryFee는 bestCoupon 계산에 필요하지만, 쿠폰 선택 시에는 필요하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
