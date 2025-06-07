import { useMemo, useState } from 'react';

import { getCoupons } from '@/api/order';
import { CartItemList } from '@/features/Cart/types/Cart.types';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { CouponResponse } from '../type/coupon.type';
import {
  calculateBOGODiscount,
  getAvailableCoupons,
  getDiscountAmount,
  getOptimalCoupons,
} from '../utils/calculateCoupons';
import { getCouponDisableStatus } from '../utils/couponDisable';

export const useCoupons = ({ cartItems }: CartItemList) => {
  const coupons = useFetchData<CouponResponse[]>({ autoFetch: getCoupons });
  const [checkedCoupons, setCheckedCoupons] = useState<Set<number>>(new Set());
  const [specialDeliveryZone, setSpecialDeliveryZone] = useState(false);

  const isAutoMode = checkedCoupons.size === 0;
  const totalPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.product.price * cur.quantity;
  }, 0);

  const deliveryFee = useMemo(() => {
    const baseFee = totalPrice >= 100000 ? 0 : 3000;
    const extraFee = specialDeliveryZone ? 3000 : 0;
    return baseFee + extraFee;
  }, [totalPrice, specialDeliveryZone]);

  const optimalCoupons = useMemo(() => {
    if (!coupons.data || coupons.isInitialLoading) return [];

    const available = getAvailableCoupons({
      coupons: coupons.data?.map((item) => ({
        ...item,
        isChecked: false,
        isDisabled: false,
      })),
      totalPrice,
      cartItems,
    });

    return getOptimalCoupons({
      availableCoupons: available,
      totalPrice,
      cartItems,
      specialDeliveryZone,
    });
  }, [cartItems, coupons.data, coupons.isInitialLoading, totalPrice, specialDeliveryZone]);

  const activeCoupons = useMemo(() => {
    return isAutoMode
      ? optimalCoupons
      : coupons.data?.filter((c) => checkedCoupons.has(c.id)) || [];
  }, [isAutoMode, optimalCoupons, coupons.data, checkedCoupons]);

  const couponDiscount = useMemo(() => {
    return activeCoupons.reduce((total, coupon) => {
      return (
        total +
        getDiscountAmount(coupon, totalPrice, calculateBOGODiscount(cartItems), specialDeliveryZone)
      );
    }, 0);
  }, [activeCoupons, cartItems, totalPrice, specialDeliveryZone]);

  const applyCoupon = (id: number) => {
    if (!checkedCoupons.has(id) && checkedCoupons.size === 2) return;

    setCheckedCoupons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectedSpecialDeliveryZone = () => setSpecialDeliveryZone(!specialDeliveryZone);

  const couponItems = coupons.data?.map((item) => {
    const isChecked = isAutoMode
      ? optimalCoupons.some((optimal) => optimal.id === item.id)
      : checkedCoupons.has(item.id);
    return {
      ...item,
      isChecked: isChecked,
      isDisabled: getCouponDisableStatus(item, totalPrice, cartItems, specialDeliveryZone) ?? false,
    };
  });

  return {
    coupons: couponItems,
    totalPrice,
    applyCoupon,
    couponDiscount,
    deliveryFee,
    specialDeliveryZone,
    selectedSpecialDeliveryZone,
  };
};
