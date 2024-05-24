import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Coupon, RawCoupon } from "../types/coupons";
import { fetchCoupons } from "../api/coupons";
import { isValidCoupon } from "../utils/validateCoupon";
import { isMetMinimumAmount } from "../utils/checkApplicableCoupon";
import { orderAmountState } from "../recoil/cartAmount";

export const useFetchCoupons = () => {
  const orderAmount = useRecoilValue(orderAmountState);

  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    (async () => {
      const rawCoupons: RawCoupon[] = await fetchCoupons();
      const coupons: Coupon[] = rawCoupons.map((rawCoupon) => ({
        ...rawCoupon,
        isSelected: false,
        isValidCoupon: isValidCoupon(rawCoupon),
        // TODO: 다른 조건 검사 로직 완성 후 isApplicableCoupon으로 통일할 것
        isApplicableCoupon: isMetMinimumAmount(rawCoupon, orderAmount),
      }));
      setCoupons(coupons);
    })();
  }, [orderAmount]);

  return { coupons, setCoupons };
};
