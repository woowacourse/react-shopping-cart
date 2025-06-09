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

  const [selectedCouponIds, toggleCoupon, resetToOptimal] =
    useCouponSelection();

  useEffect(() => {
    if (
      couponsData &&
      !couponsFetchLoading &&
      allCouponsResult.appliedCoupons.length > 0 &&
      !isInitialized.current
    ) {
      const optimalIds = allCouponsResult.appliedCoupons.map(
        (coupon) => coupon.id
      );
      resetToOptimal(optimalIds);
      isInitialized.current = true;
    }
  }, [
    couponsData,
    couponsFetchLoading,
    allCouponsResult.appliedCoupons,
    resetToOptimal,
  ]);

  const selectedCoupons = useMemo(
    () => couponsData?.filter((coupon) => selectedCouponIds?.has(coupon.id)),
    [couponsData, selectedCouponIds]
  );

  const result = useCouponDiscount({
    selectedCoupons,
    selectedShoppingCartItems,
    isIsland,
  });

  const couponSelection = useMemo(
    () => ({
      selectedCouponIds,
      toggleCoupon,
      resetToOptimal,
    }),
    [selectedCouponIds, toggleCoupon, resetToOptimal]
  );

  return {
    couponsData,
    couponsFetchLoading,
    couponSelection,
    result,
  };
}
