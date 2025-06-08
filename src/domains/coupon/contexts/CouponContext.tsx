import { createContext, PropsWithChildren, useMemo } from "react";
import { Coupon } from "../types/response";
import useCouponFetch from "../hooks/useCouponFetch";
import useCouponSelection from "../hooks/useCouponSelection";

export interface CouponContextType {
  coupons: Coupon[];
  fetchData: () => Promise<void>;
  selectedCoupons: Coupon[];
  hasNoSelectedCoupons: boolean;
  toggleCouponSelection: (couponId: number) => void;
  isCouponSelected: (id: number) => boolean;
}

export const CouponContext = createContext<CouponContextType | null>(null);

export const CouponProvider = ({ children }: PropsWithChildren) => {
  const { coupons, fetchData } = useCouponFetch();
  const {
    selectedCoupons,
    hasNoSelectedCoupons,
    toggleCouponSelection,
    isCouponSelected,
  } = useCouponSelection(coupons);

  const contextValue = useMemo(
    () => ({
      coupons,
      fetchData,
      selectedCoupons,
      hasNoSelectedCoupons,
      toggleCouponSelection,
      isCouponSelected,
    }),
    [
      coupons,
      fetchData,
      selectedCoupons,
      hasNoSelectedCoupons,
      toggleCouponSelection,
      isCouponSelected,
    ]
  );

  return (
    <CouponContext.Provider value={contextValue}>
      {children}
    </CouponContext.Provider>
  );
};
