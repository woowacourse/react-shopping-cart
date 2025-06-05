import { useState } from "react";
import { Coupon } from "../types/type";
import { LoadingStatus } from "./useCartItems";
import couponsApi from "../apis/couponsApi";

export const useCoupon = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchCoupons = async () => {
    setLoadingStatus("fetching");
    try {
      const data = await couponsApi.get();
      setCoupons(data);
      setErrorMessage("");
      setLoadingStatus("success");
    } catch (e) {
      setErrorMessage("Fail to Fetch Error");
      setLoadingStatus("error");
    }
  };

  return {
    coupons,
    fetchCoupons,
    loadingStatus,
    errorMessage,
  };
};
