import { Coupon } from "../types/coupon";
import getCouponList from "../api/couponApi";
import { useDataFetch } from "./useDataFetch";

function useCoupon() {
  const fetcher = () => getCouponList();

  const { data, loading, error, refetch } = useDataFetch<Coupon[]>(fetcher, {
    autoFetch: true,
    deps: [],
  });

  return {
    couponList: data || [],
    isLoading: loading,
    error,
    refetch,
  };
}

export default useCoupon;
