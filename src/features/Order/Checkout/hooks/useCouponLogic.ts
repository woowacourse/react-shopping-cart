import { useMemo } from 'react';

import { CartItemList } from '@/features/Cart/types/Cart.types';

import { CouponResponse } from '../type/coupon.type';
import {
  calculateBOGODiscount,
  getAvailableCoupons,
  getDiscountAmount,
  getOptimalCoupons,
} from '../utils/calculateCoupons';
import { getCouponDisableStatus } from '../utils/couponDisable';

export const useCouponLogic = ({
  coupons,
  cartItems,
  totalPrice,
  specialDeliveryZone,
  checkedCoupons,
  isAutoMode,
}: {
  coupons: CouponResponse[] | undefined;
  cartItems: CartItemList['cartItems'];
  totalPrice: number;
  specialDeliveryZone: boolean;
  checkedCoupons: Set<number>;
  isAutoMode: boolean;
}) => {
  const optimalCoupons = useMemo(() => {
    if (!coupons) return [];

    const available = getAvailableCoupons({
      coupons: coupons.map((item) => ({
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
  }, [cartItems, coupons, totalPrice, specialDeliveryZone]);

  const activeCoupons = useMemo(() => {
    return isAutoMode ? optimalCoupons : coupons?.filter((c) => checkedCoupons.has(c.id)) || [];
  }, [isAutoMode, optimalCoupons, coupons, checkedCoupons]);

  const couponDiscount = useMemo(() => {
    return activeCoupons.reduce((total, coupon) => {
      return (
        total +
        getDiscountAmount(coupon, totalPrice, calculateBOGODiscount(cartItems), specialDeliveryZone)
      );
    }, 0);
  }, [activeCoupons, cartItems, totalPrice, specialDeliveryZone]);

  const couponItems = coupons?.map((item) => {
    const isChecked = isAutoMode
      ? optimalCoupons.some((optimal) => optimal.id === item.id)
      : checkedCoupons.has(item.id);

    return {
      ...item,
      isChecked,
      isDisabled: getCouponDisableStatus(item, totalPrice, cartItems, specialDeliveryZone) ?? false,
    };
  });

  return {
    optimalCoupons,
    activeCoupons,
    couponDiscount,
    couponItems,
  };
};
