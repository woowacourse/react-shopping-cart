import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCoupons } from "../api/coupon";
import { CouponType } from "../types/coupon";

interface CouponContextType {
  coupons: CouponType[];
}

const couponContext = createContext<CouponContextType>({
  coupons: [],
});

export function CouponProvider({ children }: PropsWithChildren) {
  const [coupons, setCoupon] = useState<CouponType[]>([]);

  useEffect(() => {
    async function fetchCoupons() {
      const data = await getCoupons();
      setCoupon(data);
    }

    fetchCoupons();
  }, []);

  return (
    <couponContext.Provider value={{ coupons }}>
      {children}
    </couponContext.Provider>
  );
}

export function useCouponContext() {
  const context = useContext(couponContext);
  if (!context) {
    throw new Error("컨텍스트는 CouponProvider 내부에서 사용해야 합니다.");
  }
  return context;
}
