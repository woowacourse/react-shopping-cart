import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getCoupons } from "../api";
import { ERROR_MESSAGES } from "../constants";
import { couponsState } from "../recoil/atoms/atoms";
import { couponListSelectorState } from "../recoil/selector/selector";
import { Coupon } from "../types";

export const useFetchCoupons = (): Coupon[] => {
  const setCoupons = useSetRecoilState(couponsState);
  const coupons = useRecoilValue(couponListSelectorState);

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
