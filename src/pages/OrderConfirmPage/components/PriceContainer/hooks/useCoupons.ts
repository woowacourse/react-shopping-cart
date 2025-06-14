import { useEffect, useState } from "react";
import { CouponData } from "../../../types";
import { useCouponApi } from "../../../../../hooks/useCouponApi";

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
