import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { CouponResponse } from "../api/fetchCouponList";

interface CouponListContextType {
  couponList: CouponResponse[];
  checkedCoupons: CouponResponse[];
  updateCouponList: (list: CouponResponse[]) => void;
  checkCoupon: (coupon: CouponResponse) => void;
}

export const CouponListContext = createContext<
  CouponListContextType | undefined
>(undefined);

export const CouponListProvider = ({ children }: { children: ReactNode }) => {
  const [couponList, setCouponList] = useState<CouponResponse[]>([]);
  const [checkedCoupons, setcheckedCoupons] = useState<CouponResponse[]>([]);

  const updateCouponList = useCallback((list: CouponResponse[]) => {
    setCouponList(list);
  }, []);

  const checkCoupon = useCallback((coupon: CouponResponse) => {
    setcheckedCoupons((prev) => {
      const already = prev.some((c) => c.id === coupon.id);
      if (already) {
        return prev.filter((c) => c.id !== coupon.id);
      }
      if (prev.length >= 2) {
        return prev;
      }
      return [...prev, coupon];
    });
  }, []);

  const value = useMemo<CouponListContextType>(
    () => ({
      couponList,
      checkedCoupons,
      updateCouponList,
      checkCoupon,
    }),
    [couponList, checkedCoupons, updateCouponList, checkCoupon]
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
