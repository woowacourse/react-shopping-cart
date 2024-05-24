import { useRecoilState, useRecoilValue } from 'recoil';
import { fetchCouponsSelector } from '../recoil/selectors';
import { couponsState } from '../recoil/atoms';
import { useEffect } from 'react';

export const useCouponChecker = () => {
  const fetchedCoupons = useRecoilValue(fetchCouponsSelector);
  const [coupons, setCoupons] = useRecoilState(couponsState);

  useEffect(() => {
    setCoupons(
      fetchedCoupons.map((coupon) => ({ ...coupon, isChecked: false })),
    );
  }, [fetchedCoupons, setCoupons]);

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
