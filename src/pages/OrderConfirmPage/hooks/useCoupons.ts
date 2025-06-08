import { useEffect, useState } from "react";
import { useCouponApi } from "../../../hooks/useCouponApi";
import { CouponData } from "../types";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const { isLoading, getCoupons } = useCouponApi();

  useEffect(() => {
    (async () => {
      const fetchCartItems = await getCoupons();
      setCoupons(fetchCartItems!);
    })();
  }, []);

  return {
    coupons,
    isLoading,
  };
};
