import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import useDiscountType from './useDiscountType';
import {
  couponSelectedState,
  selectedCouponsSelector,
} from '../recoil/coupons';
import useCouponAvailable from './useCouponAvailable';
import { fetchedCouponsSelector } from '../recoil/fetch';

const useCoupons = () => {
  const coupons = useRecoilValue(fetchedCouponsSelector);
  const { applyCoupon, getDiscountAmount } = useDiscountType();

  const selectedCoupons = useRecoilValue(selectedCouponsSelector);
  const couponIdList = selectedCoupons.map((coupon) => {
    return coupon.id;
  });

  const { isCouponAvailable } = useCouponAvailable();

  const resetSelectCoupon = useRecoilCallback(
    ({ reset }) =>
      () => {
        couponIdList.forEach((id) => {
          reset(couponSelectedState(id));
        });
      },
    [selectedCoupons],
  );

  /**
   * 선택된 쿠폰 적용
   */
  useEffect(() => {
    applyCoupon(selectedCoupons);
  }, [selectedCoupons]);

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
    getDiscountAmount,
    availableCouponsFiltered,
    disableCouponsFiltered,
    resetSelectCoupon,
  };
};

export default useCoupons;
