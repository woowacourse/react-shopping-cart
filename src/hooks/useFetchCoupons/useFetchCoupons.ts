import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { couponsAtom } from "../../recoil/atom/atom";
import { fetchCoupons } from "../../api/couponApi";

export const useFetchCoupons = () => {
  const setCoupons = useSetRecoilState(couponsAtom);

  useEffect(() => {
    const fetchAndSetCoupons = async () => {
      const fetchedCoupons = await fetchCoupons();
      setCoupons(fetchedCoupons);
    };

    fetchAndSetCoupons();
  }, [setCoupons]);
};
