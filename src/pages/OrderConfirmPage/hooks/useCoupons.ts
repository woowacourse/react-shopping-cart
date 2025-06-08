import { useEffect, useState } from "react";
import { useCouponApi } from "../../../hooks/useCouponApi";
import { GetCouponResponse } from "../../../apis/couponApi";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState<GetCouponResponse[]>([]);
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
