import { useFetch } from "../useFetch";
import { Coupon } from "@/type/Coupon";
import fetchCoupons from "@/apis/fetchCoupons";
import { useCallback } from "react";

function useCouponFetch() {
  const getCoupons = useCallback(async () => {
    const { content } = (await fetchCoupons()) as { content: Coupon[] };
    return content;
  }, []);

  const {
    data: couponsData,
    error: couponsFetchError,
    loading: couponsFetchLoading,
    refetch: refetchCoupons,
  } = useFetch<Coupon[]>(getCoupons);

  return {
    couponsData,
    couponsFetchError,
    couponsFetchLoading,
    refetchCoupons,
  };
}

export default useCouponFetch;
