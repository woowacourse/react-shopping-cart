import { useState } from 'react';
import { useLoadCoupon, useApplyCoupons, useDiscount } from './index';
import { Coupon } from '@type/coupon';

const useCoupon = (isolatedRegion: boolean) => {
  const notExpiredCoupon = useLoadCoupon();
  const { applyingCoupons, changeApplying, isSelected, isAlreadyApplyingMaximumCoupons } =
    useApplyCoupons();

  const [couponDetail, setCouponDetail] = useState<Coupon[]>([]);
  const { discountAmount, handleDiscountAmount } = useDiscount(applyingCoupons, isolatedRegion);

  const handleCouponDetail = (coupons: Coupon[]) => {
    setCouponDetail(coupons);
  };

  return {
    notExpiredCoupon,
    changeApplying,
    couponDetail,
    handleCouponDetail,
    isSelected,
    applyingCoupons,
    isAlreadyApplyingMaximumCoupons,
    discountAmount,
    handleDiscountAmount,
  };
};

export default useCoupon;
