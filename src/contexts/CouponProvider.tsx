import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCoupons } from "../api/coupon";
import { CouponMap, CouponType } from "../types/coupon";

interface CouponContextType {
  coupons: CouponMap;
}

const couponContext = createContext<CouponContextType>({
  coupons: {
    fixed: [],
    buyXgetY: [],
    freeShipping: [],
    percentage: [],
  },
});

export function CouponProvider({ children }: PropsWithChildren) {
  const [coupons, setCoupon] = useState<CouponMap>({
    fixed: [],
    buyXgetY: [],
    freeShipping: [],
    percentage: [],
  });

  useEffect(() => {
    async function fetchCoupons() {
      const data = await getCoupons();
      const groupedCoupons = groupCouponsByType(data);
      setCoupon(groupedCoupons);
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

function groupCouponsByType(coupons: CouponType[]): CouponMap {
  return coupons.reduce(
    (acc, coupon) => {
      const key = coupon.discountType;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(coupon);
      return acc;
    },
    {
      fixed: [],
      buyXgetY: [],
      freeShipping: [],
      percentage: [],
    } as CouponMap
  );
}
