import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getCoupons } from "../api";
import { ERROR_MESSAGES } from "../constants";
import { couponsState } from "../recoil/atoms/atoms";
import { Coupon } from "../types";

export const useFetchCoupons = (): Coupon[] => {
  const [coupons, setCoupons] = useRecoilState<Coupon[]>(couponsState);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (error) {
        console.error(ERROR_MESSAGES.FETCH_COUPONS, error);
      }
    };

    fetchCoupons();
  }, [setCoupons]);

  return coupons;
};
