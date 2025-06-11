import { useMemo, useEffect } from "react";
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

  const { appliedCoupons } = useBestCouponCombo({
    coupons: couponsData ?? [],
    selectedShoppingCartItems,
    isIsland,
  });

  const appliedCouponIds = useMemo(
    () => appliedCoupons.map((c) => c.id),
    [appliedCoupons]
  );

  const { selectedCouponIds, toggleCoupon, resetToOptimal } =
    useCouponSelection();

  const couponsReady =
    !!couponsData &&
    !couponsFetchLoading &&
    selectedShoppingCartItems.length > 0;

  useEffect(() => {
    if (couponsReady) resetToOptimal(appliedCouponIds);
  }, [couponsReady, appliedCouponIds, resetToOptimal]);

  const selectedCoupons = couponsData?.filter((c) =>
    selectedCouponIds.has(c.id)
  );

  const result = useCouponDiscount({
    selectedCoupons,
    selectedShoppingCartItems,
    isIsland,
  });

  return {
    couponsData,
    couponsFetchLoading,
    couponSelection: { selectedCouponIds, toggleCoupon, resetToOptimal },
    result,
  };
}
