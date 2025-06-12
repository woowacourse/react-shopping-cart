import { useEffect, useState } from "react";
import couponsApi from "../../apis/couponsApi";
import { Coupon } from "../../types/type";
import { LoadingStatus } from "../useCartItems";

export const useCouponApi = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCoupons = async () => {
    setLoadingStatus("fetching");
    try {
      const data = await couponsApi.get();
      setCoupons(data);
      setLoadingStatus("success");
      setErrorMessage("");
      return data;
    } catch {
      setLoadingStatus("error");
      setErrorMessage("Fail to Fetch Error");
      return [];
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return { coupons, loadingStatus, errorMessage, refetch: fetchCoupons };
};
