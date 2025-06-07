import { useCallback, useState } from "react";
import { Coupon } from "../types/response";
import useErrorHandler from "../../../hooks/useErrorHandler";
import { getCoupons } from "../apis/getCoupons";

const useCouponFetch = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { handleError } = useErrorHandler();

  const fetchData = useCallback(async () => {
    try {
      setCoupons(await getCoupons());
    } catch (error) {
      handleError(error);
    }
  }, [handleError]);

  return { coupons, fetchData };
};

export default useCouponFetch;
