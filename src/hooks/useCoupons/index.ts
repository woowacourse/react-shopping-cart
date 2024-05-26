import { useRecoilValue } from "recoil";
import { useToggleSet } from "../useToggleSet";
import { useCouponListDiscountCalculator } from "../useCouponListDiscountCalculator";
import { useCouponSelectabilityChecker } from "../useCouponSelectabilityChecker";
import { rawCouponsSelector } from "../../recoil/rawCoupons";
import { cartAmountState } from "../../recoil/cartAmount";
import { Coupon } from "../../types/coupon";
import { MAX_SELECTABLE_COUPON_COUNT } from "./ruleConstants";

interface UseCouponsReturn {
  coupons: Coupon[];
  toggleSelection: (couponId: number) => void;
  discountAmount: number;
  totalPayAmount: number;
  hasReachedCouponMaxCount: boolean;
}

export const useCoupons = (): UseCouponsReturn => {
  const rawCoupons = useRecoilValue(rawCouponsSelector);
  const [selectedCouponIds, toggleSelection] = useToggleSet<number>();
  const { totalOrderAmount } = useRecoilValue(cartAmountState);

  const { checkCouponSelectable } = useCouponSelectabilityChecker();
  const { calculateCouponListDiscount } = useCouponListDiscountCalculator();

  const coupons: Coupon[] = rawCoupons.map((coupon) => ({
    ...coupon,
    isSelected: selectedCouponIds.has(coupon.id),
    isSelectable: checkCouponSelectable(coupon),
  }));

  const discountAmount = calculateCouponListDiscount(coupons);
  const totalPayAmount = totalOrderAmount - discountAmount;

  const hasReachedCouponMaxCount = selectedCouponIds.size >= MAX_SELECTABLE_COUPON_COUNT;

  return {
    coupons,
    toggleSelection,
    discountAmount,
    totalPayAmount,
    hasReachedCouponMaxCount,
  };
};
