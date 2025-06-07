import { createContext, useContext } from 'react';
import { CartItem, Coupon } from '../types';

interface CouponContext {
  coupons: Coupon[];
  getAvailableCoupons: (checkedCartItems: CartItem[]) => Coupon[];
  checkedCouponIds: number[];
  addCheckedCouponIds: (id: number) => void;
  removeCheckedCouponIds: (id: number) => void;
  initCheckedCouponIds: (
    availableCoupons: Coupon[],
    checkedCartItems: CartItem[],
    deliveryPrice: number,
    couponAmount: number
  ) => void;
}

export const CouponContext = createContext<CouponContext | null>(null);

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCouponContext는 CouponProvider로 감싸져야 합니다.');
  }
  return context;
};
