import { useCallback, useState } from 'react';
import { CartItem, Coupon } from '../types';
import { getMaxDiscountCoupons } from '../utils';

const useCheckedCouponIds = () => {
  const [checkedCouponIds, setCheckedCouponIds] = useState<number[]>([]);

  const addCheckedCouponIds = (id: number) => {
    setCheckedCouponIds((prev) => [...prev, id]);
  };

  const removeCheckedCouponIds = (id: number) => {
    setCheckedCouponIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const initCheckedCouponIds = useCallback(
    (
      availableCoupons: Coupon[],
      checkedCartItems: CartItem[],
      deliveryPrice: number,
      couponAmount: number
    ) => {
      setCheckedCouponIds(
        getMaxDiscountCoupons(checkedCartItems, availableCoupons, deliveryPrice, couponAmount).map(
          (coupon) => coupon.id
        )
      );
    },
    []
  );

  return {
    checkedCouponIds,
    addCheckedCouponIds,
    removeCheckedCouponIds,
    initCheckedCouponIds,
  };
};

export default useCheckedCouponIds;
