import { useMemo } from "react";
import { useCouponFetch } from "./useCouponFetch";
import { useBestCouponCombo } from "./useBestCouponCombo";
import { useCouponSelection } from "./useCouponSelection";
import { useCouponDiscount } from "./useCouponDiscount";
import { CartItem } from "@/type/CartItem";

interface UseCouponManagementParams {
  selectedShoppingCartItems: CartItem[];
  isIsland: boolean;
}

export function useCouponManagement({
  selectedShoppingCartItems,
  isIsland,
}: UseCouponManagementParams) {
  const { couponsData, couponsFetchLoading } = useCouponFetch();

  const allCouponsResult = useBestCouponCombo({
    coupons: couponsData || [],
    selectedShoppingCartItems,
    isIsland,
  });

  const initialOptimalCouponIds = useMemo(() => {
    return new Set(allCouponsResult.appliedCoupons.map((coupon) => coupon.id));
  }, [allCouponsResult.appliedCoupons]);

  const couponSelection = useCouponSelection(initialOptimalCouponIds);

  const selectedCoupons = useMemo(
    () =>
      couponsData?.filter((coupon) =>
        couponSelection.selectedCouponIds?.has(coupon.id)
      ),
    [couponsData, couponSelection.selectedCouponIds]
  );

  const result = useCouponDiscount({
    selectedCoupons,
    selectedShoppingCartItems,
    isIsland,
  });

  return {
    couponsData,
    couponsFetchLoading,
    couponSelection,
    result,
  };
}
