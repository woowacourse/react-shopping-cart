import { CouponContent } from '@/api/type';
import { getDiscountByCouponId } from '../utils/getDiscountByCouponId';
import { useMemo } from 'react';
import { Cart } from '@/api/cart';

interface calculateTotalDiscountInput {
  selectedCouponIds: number[];
  availableCoupons: CouponContent[];
  orderPrice: number;
  selectedItems: Cart[];
  isJejuOrRemoteArea: boolean;
}

export const useCalculateTotalDiscount = ({
  selectedCouponIds,
  availableCoupons,
  orderPrice,
  selectedItems,
  isJejuOrRemoteArea,
}: calculateTotalDiscountInput) => {
  const totalDiscount = useMemo(() => {
    const selectedCoupons = selectedCouponIds
      .map((id) => availableCoupons.find((c) => c.id === id))
      .filter(Boolean) as CouponContent[];

    return selectedCoupons.reduce((total, coupon) => {
      return (
        total +
        getDiscountByCouponId(
          coupon,
          orderPrice,
          selectedItems,
          isJejuOrRemoteArea
        )
      );
    }, 0);
  }, [
    selectedCouponIds,
    availableCoupons,
    orderPrice,
    selectedItems,
    isJejuOrRemoteArea,
  ]);

  return totalDiscount;
};
