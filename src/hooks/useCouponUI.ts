import { calculateCouponPrice } from '../utils/calculateCouponPrice';
import { isCouponDisabled } from '../utils/isCouponDisabled';
import { Coupon } from '../types/coupon';
import { CartItemTypes } from '../types/cartItem';

interface useCouponUIProps {
  coupons: Coupon[];
  selectedCouponIds: string[];
  selectedCartItems: CartItemTypes[];
  deliveryFee: number;
}

function useCouponUI({
  coupons,
  selectedCouponIds,
  selectedCartItems,
  deliveryFee,
}: useCouponUIProps) {
  const couponPrice = calculateCouponPrice({
    couponIds: selectedCouponIds,
    coupons,
    selectedCartItems,
    deliveryFee,
    nowDate: new Date(),
  });

  const couponWithDisabled = coupons.map((coupon) =>
    isCouponDisabled(coupon, selectedCartItems, deliveryFee)
  );

  return {
    couponPrice,
    couponWithDisabled,
  };
}

export default useCouponUI;
