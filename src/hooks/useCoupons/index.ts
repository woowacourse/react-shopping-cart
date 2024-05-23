import { useRecoilValue } from "recoil";
import { rawCouponsSelector } from "../../recoil/rawCoupons";
import { Coupon } from "../../types/coupon";
import { useToggleList } from "../useToggleList";
import { useCouponsDiscountCalculator } from "../useCouponsDiscountCalculator";
import { useCouponSelectabilityChecker } from "../useCouponsSelectabilityChecker";

interface UseCouponReturn {
  coupons: Coupon[];
  toggleSelection: (couponId: number) => void;
  discountAmount: number;
}

export const useCoupons = (): UseCouponReturn => {
  const rawCoupons = useRecoilValue(rawCouponsSelector);
  const [selectedCouponIds, toggleSelection] = useToggleList<number>();

  const isCouponSelectable = useCouponSelectabilityChecker();
  const calculateCouponsDiscount = useCouponsDiscountCalculator();

  const coupons: Coupon[] = rawCoupons.map((coupon) => ({
    ...coupon,
    isSelected: selectedCouponIds.includes(coupon.id),
    isSelectable: isCouponSelectable(coupon),
  }));

  const discountAmount = calculateCouponsDiscount(coupons);

  return {
    coupons,
    toggleSelection,
    discountAmount,
  };
};
