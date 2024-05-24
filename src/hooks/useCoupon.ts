import { Coupon } from '../type';
import { selectedCoupons } from './../recoil/atoms';
import { useRecoilState } from 'recoil';

export default function useCoupon() {
  const MAX_COUPON_NUMBER = 2;

  const [coupons, setCoupons] = useRecoilState(selectedCoupons);

  const isSelectedCoupon = (targetCoupon: Coupon) =>
    coupons.some((coupon) => coupon.id === targetCoupon.id);

  const addCoupon = (targetCoupon: Coupon) => {
    if (isSelectedCoupon(targetCoupon)) return;
    if (coupons.length >= MAX_COUPON_NUMBER) return;
    setCoupons([...coupons, targetCoupon]);
  };

  const deleteCoupon = (targetCoupon: Coupon) => {
    const couponIndex = coupons.findIndex((coupon) => coupon.id === targetCoupon.id);
    if (couponIndex === -1) return;
    const nextCoupons = [...coupons];
    nextCoupons.splice(couponIndex, 1);
    setCoupons(nextCoupons);
  };

  const isAddable = coupons.length < MAX_COUPON_NUMBER;

  return { isSelectedCoupon, addCoupon, deleteCoupon, isAddable };
}
