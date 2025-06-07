import { createContext, PropsWithChildren, useCallback, useState } from "react";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { getCoupons } from "../apis/getCoupons";
import { Coupon } from "../types/response";

interface CouponType {
  coupons: Coupon[];
  fetchData: () => Promise<void>;
}

export const CouponContext = createContext<CouponType | null>(null);

export const CouponProvider = ({ children }: PropsWithChildren) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      setCoupons(await getCoupons());
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  return (
    <CouponContext.Provider value={{ coupons, fetchData }}>
      {children}
    </CouponContext.Provider>
  );
};
