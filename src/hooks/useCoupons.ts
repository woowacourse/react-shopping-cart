import { useRecoilCallback, useRecoilValue } from 'recoil';
import { fetchedCouponsSelector } from '../recoil/fetch';
import { useEffect } from 'react';
import useDiscountType from './useDiscountType';
import useCouponAvailable from './useCouponAvailable';
import {
  couponIds,
  couponSelectedState,
  selectedCouponsSelector,
} from '../recoil/coupons';

const useCoupons = () => {
  const coupons = useRecoilValue(fetchedCouponsSelector);
  const { applyCoupon, getDiscountAmount } = useDiscountType();
  const couponIdList = useRecoilValue(couponIds);

  const selectedCoupons = useRecoilValue(selectedCouponsSelector);

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
