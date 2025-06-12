import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { CouponResponse } from "../types/Coupon";

interface CouponListContextType {
  couponList: CouponResponse[];
  checkedCoupons: CouponResponse["id"][];
  setCouponList: (list: CouponResponse[]) => void;
  setCheckedCoupons: (couponId: CouponResponse["id"][]) => void;
}

export const CouponListContext = createContext<
  CouponListContextType | undefined
>(undefined);

export const CouponListProvider = ({ children }: { children: ReactNode }) => {
  const [couponList, setCouponList] = useState<CouponResponse[]>([]);
  const [checkedCoupons, setCheckedCoupons] = useState<CouponResponse["id"][]>(
    []
  );

  const value = useMemo<CouponListContextType>(
    () => ({
      couponList,
      checkedCoupons,
      setCouponList,
      setCheckedCoupons,
    }),
    [couponList, checkedCoupons, setCouponList, setCheckedCoupons]
  );

  return (
    <CouponListContext.Provider value={value}>
      {children}
    </CouponListContext.Provider>
  );
};

export const useCouponListContext = () => {
  const context = useContext(CouponListContext);
  if (!context) {
    throw new Error(
      "useCouponListContext는 CouponListProvider 안에서 사용해야 합니다."
    );
  }
  return context;
};
