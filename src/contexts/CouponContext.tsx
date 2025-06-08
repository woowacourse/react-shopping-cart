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
  updateCouponList: (list: CouponResponse[]) => void;
}

export const CouponListContext = createContext<
  CouponListContextType | undefined
>(undefined);

export const CouponListProvider = ({ children }: { children: ReactNode }) => {
  const [couponList, setCouponList] = useState<CouponResponse[]>([]);

  const updateCouponList = useCallback((list: CouponResponse[]) => {
    setCouponList(list);
  }, []);

  const value = useMemo<CouponListContextType>(
    () => ({
      couponList,
      updateCouponList,
    }),
    [couponList, updateCouponList]
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
