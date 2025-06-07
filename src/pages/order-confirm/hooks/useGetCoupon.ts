import { getCoupon } from "@/apis/coupon/getCoupon";
import useFetchData from "@/shared/hooks/useFetchData";

export const useGetCoupon = () => {
  const {
    data: couponList,
    isLoading,
    errorMessage,
  } = useFetchData({ fetchFn: getCoupon });

  return {
    couponList: couponList ?? [],
    isLoading,
    errorMessage,
  };
};
