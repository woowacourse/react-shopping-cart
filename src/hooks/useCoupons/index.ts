import { useRecoilValue } from "recoil";
import { useToggleList } from "../useToggleList";
import { useCouponsDiscountCalculator } from "../useCouponsDiscountCalculator";
import { useCouponSelectabilityChecker } from "../useCouponSelectabilityChecker";
import { rawCouponsSelector } from "../../recoil/rawCoupons";
import { cartAmountState } from "../../recoil/cartAmount";
import { Coupon } from "../../types/coupon";

interface UseCouponReturn {
  coupons: Coupon[];
  toggleSelection: (couponId: number) => void;
  discountAmount: number;
  totalPayAmount: number;
}

export const useCoupons = (): UseCouponReturn => {
  const rawCoupons = useRecoilValue(rawCouponsSelector);
  const [selectedCouponIds, toggleSelection] = useToggleList<number>();
  const { totalOrderAmount } = useRecoilValue(cartAmountState);

  const isCouponSelectable = useCouponSelectabilityChecker();
  const calculateCouponsDiscount = useCouponsDiscountCalculator();

  const coupons: Coupon[] = rawCoupons.map((coupon) => ({
    ...coupon,
    isSelected: selectedCouponIds.includes(coupon.id),
    isSelectable: isCouponSelectable(coupon),
  }));

  const discountAmount = calculateCouponsDiscount(coupons);
  const totalPayAmount = totalOrderAmount - discountAmount;

  return {
    coupons,
    toggleSelection,
    discountAmount,
    totalPayAmount,
  };
};
