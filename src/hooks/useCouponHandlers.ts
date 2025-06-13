import { Content } from '../types/cartItems';
import { CouponsResponse } from '../types/coupons';
import { couponRules } from '../utils/couponRules';

const MAX_COUPONS = 2;

export function useCouponHandlers(
  selectedCoupons: CouponsResponse[],
  setSelectedCoupons: (coupons: CouponsResponse[]) => void,
  orderPrice: number,
  selectedItems: Content[]
) {
  const selectedIds = selectedCoupons.map((c) => c.id);

  const isCouponDisabled = (coupon: CouponsResponse): boolean => {
    const isAlreadySelected = selectedIds.includes(coupon.id);
    if (!isAlreadySelected && selectedCoupons.length >= MAX_COUPONS) return true;

    const rule = couponRules[coupon.code];
    return rule ? rule(coupon, { orderPrice, selectedItems, selectedCoupons }) : false;
  };

  const toggleCoupon = (coupon: CouponsResponse) => {
    if (isCouponDisabled(coupon)) return;

    const isSelected = selectedIds.includes(coupon.id);
    const updated = isSelected
      ? selectedCoupons.filter((c) => c.id !== coupon.id)
      : [...selectedCoupons, coupon].slice(0, MAX_COUPONS);

    setSelectedCoupons(updated);
  };

  return { isCouponDisabled, toggleCoupon, selectedIds };
}
