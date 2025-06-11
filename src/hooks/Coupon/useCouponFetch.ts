import { useFetch } from "../useFetch";
import { Coupon } from "@/type/Coupon";
import fetchCoupons from "@/apis/fetchCoupons";
import { useCallback } from "react";
import { useErrorToast } from "@/contexts/ErrorToastContext";

function useCouponFetch() {
  const { showError } = useErrorToast();
  const getCoupons = useCallback(async () => {
    const { content } = (await fetchCoupons()) as { content: Coupon[] };
    return content;
  }, []);

  const {
    data: couponsData,
    error: couponsFetchError,
    loading: couponsFetchLoading,
  } = useFetch<Coupon[]>(getCoupons);

  if (couponsFetchError) {
    showError(couponsFetchError);
  }

  return {
    couponsData,
    couponsFetchLoading,
  };
}

export { useCouponFetch };
