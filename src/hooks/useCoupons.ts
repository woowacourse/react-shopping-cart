import { useRecoilValue } from 'recoil';
import { fetchedCouponsSelector } from '../recoil/fetch';
import useSelectCoupon from './useSelectCoupon';
import { useEffect } from 'react';
import { CouponType } from '../components/type';
import useDiscountType from './useDiscountType';
import useCouponAvailable from './useCouponAvailable';

const useCoupons = () => {
  const coupons = useRecoilValue(fetchedCouponsSelector);
  const { applyCoupon, getDiscountAmount } = useDiscountType();

  const {
    selectCoupon,
    couponSelected,
    isDoubleCouponApplied,
    resetSelectCoupon,
  } = useSelectCoupon();

  const { isCouponAvailable } = useCouponAvailable();

  /**
   * 선택된 쿠폰 적용
   */
  useEffect(() => {
    const selectedCouponApply = coupons.filter((coupon: CouponType) => {
      return couponSelected[coupon.code];
    });
    applyCoupon(selectedCouponApply);
  }, [couponSelected]);

  /**
   * 사용 가능한 쿠폰 목록
   */
  const availableCouponsFiltered = coupons.filter((coupon) => {
    return isCouponAvailable(coupon);
  });

  /**
   * 사용 불가능한 쿠폰 목록
   */
  const disableCouponsFiltered = coupons.filter((coupon) => {
    return !isCouponAvailable(coupon);
  });

  return {
    resetSelectCoupon,
    getDiscountAmount,
    selectCoupon,
    isDoubleCouponApplied,
    availableCouponsFiltered,
    disableCouponsFiltered,
  };
};

export default useCoupons;
