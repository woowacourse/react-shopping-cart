import { useRecoilState } from 'recoil';
import { couponsState } from '../recoil/atoms';

export const useCouponChecker = () => {
  const [coupons, setCoupons] = useRecoilState(couponsState);

  /**
   *  isChecked 상태를 토글
   */
  const toggleCouponCheck = (couponId: number) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === couponId
          ? { ...coupon, isChecked: !coupon.isChecked }
          : coupon,
      ),
    );
  };

  /**
   * isChecked 상태가 true인 쿠폰의 개수를 반환하는 함수
   */
  const getCheckedCount = () => {
    return coupons.filter((coupon) => coupon.isChecked).length;
  };

  return {
    coupons,
    toggleCouponCheck,
    getCheckedCount,
  };
};
