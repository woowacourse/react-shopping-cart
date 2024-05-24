import { Coupon } from '../type';
import { selectedCoupons } from './../recoil/atoms';
import { useRecoilState } from 'recoil';

export default function useCoupon() {
  const [coupons, setCoupons] = useRecoilState(selectedCoupons);

  const isUsedCoupon = (targetCoupon: Coupon) =>
    coupons.some((coupon) => coupon.id === targetCoupon.id);

  const addCoupon = (targetCoupon: Coupon) => {
    if (isUsedCoupon(targetCoupon)) return;
    if (coupons.length >= 2) return;
    setCoupons([...coupons, targetCoupon]);
  };

  const deleteCoupon = (targetCoupon: Coupon) => {
    const couponIndex = coupons.findIndex((coupon) => coupon.id === targetCoupon.id);
    if (couponIndex === -1) return;
    const nextCoupons = [...coupons];
    nextCoupons.splice(couponIndex, 1);
    setCoupons(nextCoupons);
  };

  return { isUsedCoupon, addCoupon, deleteCoupon };
}
