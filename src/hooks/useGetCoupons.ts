import { useState, useEffect } from "react";
import { getCoupons } from "../api/coupon/getCoupons";
import { useShowError } from "../provider/errorProvider";
import { CouponResponse } from "../type/coupon";

const useGetCoupons = () => {
  const [coupons, setCoupons] = useState<CouponResponse[]>();
  const showError = useShowError();

  const request = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (e) {
      showError?.("데이터를 불러오는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    request();
  }, []);

  return { coupons, refetch: getCoupons };
};

export default useGetCoupons;
