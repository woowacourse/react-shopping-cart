import { useState } from "react";
import { useErrorMessage } from "../../../shared/contexts/ErrorContext";
import { CouponResponse } from "../../../shared/types/coupon";
import couponApi from "../apis/couponApi";

const useCouponResource = () => {
  const { setErrorMessage } = useErrorMessage();

  const [coupons, setCoupons] = useState<CouponResponse[]>([]);

  const getCoupons = async () => {
    try {
      const data = await couponApi.get();
      setCoupons(data);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  return { coupons, fetchCoupons: getCoupons };
};

export default useCouponResource;
