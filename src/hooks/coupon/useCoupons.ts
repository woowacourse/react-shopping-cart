import { couponsState } from "@/recoil/coupons";
import { Coupon } from "@/types/coupon";
import { useRecoilState } from "recoil";

const useCoupons = () => {
  const [couponList, setCouponList] = useRecoilState(couponsState);

  const applyCoupon = (newCoupon: Coupon) => {
    if (isOverMaxCouponCount()) {
      replaceOldToNewCoupon();
    }
    setCouponList((prev) => [...prev, newCoupon]);
  };

  const unapplyCoupon = (couponId: number) => {
    const newCouponList = couponList.filter((coupon) => coupon.id !== couponId);
    setCouponList(newCouponList);
  };

  const isCouponApplied = (couponId: number) => {
    return couponList.find((coupon) => coupon.id === couponId);
  };

  const isOverMaxCouponCount = () => {
    if (couponList.length >= 2) {
      return true;
    }
    return false;
  };

  const replaceOldToNewCoupon = () => {
    const oldCouponList = [...couponList];
    oldCouponList.shift();
    setCouponList(oldCouponList);
  };

  return { applyCoupon, unapplyCoupon, isCouponApplied, couponList };
};

export default useCoupons;
