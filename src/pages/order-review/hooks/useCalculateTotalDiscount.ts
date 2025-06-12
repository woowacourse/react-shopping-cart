import { Cart } from '@/api/cart';
import { CouponContent } from '@/api/type';
import { getDiscountByCouponId } from '../utils/getDiscountByCouponId';

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
  const selectedCoupons = selectedCouponIds
    .map((id) => availableCoupons.find((c) => c.id === id))
    .filter(Boolean) as CouponContent[];

  const totalDiscount = selectedCoupons.reduce((total, coupon) => {
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

  return totalDiscount;
};
