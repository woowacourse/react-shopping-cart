import { useEffect, useState } from "react";
import { getCouponItems } from "../api/coupon";
import { CouponType } from "../types/coupon";

export function useCoupons() {
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCouponItems();
      setCoupons(data);
    })();
  }, []);

  return {
    coupons,
  };
}
