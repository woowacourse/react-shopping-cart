import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { fetchCouponSelector } from '@/recoil/coupons/fetchCouponSelector';

const useCoupon = () => {
  const couponList = useRecoilValue(fetchCouponSelector);
  const [couponCheckList, setCouponCheckList] = useState(() =>
    couponList.map((coupon) => ({
      id: coupon.id,
      isChecked: false,
    })),
  );
  const isValidCouponCount = couponCheckList.filter((coupon) => coupon.isChecked).length < 2;

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const clickedCouponId = Number(e.target.id);

    setCouponCheckList(
      couponCheckList.map((coupon) => ({
        ...coupon,
        isChecked: clickedCouponId === coupon.id ? !coupon.isChecked : coupon.isChecked,
      })),
    );
  };

  return { couponList, couponCheckList, isValidCouponCount, handleChangeChecked };
};

export default useCoupon;
