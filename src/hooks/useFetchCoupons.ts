import { useState } from "react";
import couponsApi, { Coupon } from "../apis/coupons";

export const useFetchCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string>("");

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const data = await couponsApi.get();
      setCoupons(data);
      setFetchError("");
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setFetchError("쿠폰을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    coupons,
    isLoading,
    fetchError,
    fetchCoupons,
  };
};
