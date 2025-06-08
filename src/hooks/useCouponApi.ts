import couponApi from "../apis/couponApi";
import { useState } from "react";
import { useError } from "../contexts/ErrorContext";

export const useCouponApi = () => {
  const { showError } = useError();
  const [isLoading, setIsLoading] = useState(false);

  const getCoupons = async () => {
    setIsLoading(true);
    try {
      const data = await couponApi.get();
      const newCouponData = Object.values(data);
      return newCouponData;
    } catch (e) {
      if (e instanceof Error) showError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getCoupons,
  };
};
