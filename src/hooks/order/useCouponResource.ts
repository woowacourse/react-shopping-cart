import { useEffect, useState } from "react";
import { useErrorMessage } from "../../contexts/ErrorContext";
import { CouponResponse } from "../../types/coupon";
import couponApi from "../../apis/couponApi";

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

  useEffect(() => {
    getCoupons();
  }, []);
  return { coupons };
};

export default useCouponResource;
