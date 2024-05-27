import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Coupon, RawCoupon } from "../types/coupons";
import { fetchCoupons } from "../api/coupons";
import { isValidCoupon } from "../utils/validateCoupon";
import { checkApplicableCoupon } from "../utils/checkApplicableCoupon";
import { orderAmountState } from "../recoil/cartAmount";
import { cartItemsState } from "../recoil/cart/cartItems";

export const useFetchCoupons = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const orderAmount = useRecoilValue(orderAmountState);

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const rawCoupons: RawCoupon[] = await fetchCoupons();
        const coupons: Coupon[] = rawCoupons.map((rawCoupon) => ({
          ...rawCoupon,
          isSelected: false,
          isValidCoupon: isValidCoupon(rawCoupon),
          isApplicableCoupon: checkApplicableCoupon(rawCoupon, {
            orderAmount,
            cartItems,
          }),
        }));
        setCoupons(coupons);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    })();
  }, [orderAmount]);

  return { coupons, isLoading, isError };
};
