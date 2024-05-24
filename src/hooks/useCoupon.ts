import { couponsState } from "@/recoil/coupons";
import { Coupon } from "@/types/coupon";
import { useRecoilState } from "recoil";

const useCoupon = () => {
  const [appliedCouponList, setAppliedCouponList] =
    useRecoilState(couponsState);

  const applyCoupon = (newCoupon: Coupon) => {
    setAppliedCouponList((prev) => [...prev, newCoupon]);
  };
  //2+1쿠폰을 먼저 적용한다.

  //퍼센트 쿠폰을 적용한다.

  //절대단위 쿠폰을 적용한다.

  //2개의 쿠폰을 적용하고, 만약 3개이면 가장 기존것을 없앤다.

  return { applyCoupon };
};

export default useCoupon;
