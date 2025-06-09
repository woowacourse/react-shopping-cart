import { useMemo, useEffect, useRef } from "react";
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

  const isInitialized = useRef(false);

  const allCouponsResult = useBestCouponCombo({
    coupons: couponsData || [],
    selectedShoppingCartItems,
    isIsland,
  });

  const couponSelection = useCouponSelection();

  useEffect(() => {
    if (
      couponsData &&
      !couponsFetchLoading &&
      allCouponsResult.appliedCoupons.length > 0 &&
      !isInitialized.current
    ) {
      const optimalIds = new Set(
        allCouponsResult.appliedCoupons.map((coupon) => coupon.id)
      );
      couponSelection.resetToOptimal(optimalIds);
      isInitialized.current = true;
    }
  }, [
    couponsData,
    couponsFetchLoading,
    allCouponsResult.appliedCoupons,
    couponSelection.resetToOptimal,
  ]);

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
