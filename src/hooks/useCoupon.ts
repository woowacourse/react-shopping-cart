import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useDiscountCalculator from './useDiscountCalculator';

import { orderResultState } from '@/recoil/cartItems/selectors';
import { couponSavedCheckListState, totalDiscountPriceState } from '@/recoil/coupons/atoms';
import { fetchCouponSelector } from '@/recoil/coupons/fetchCouponSelector';
import { Coupon } from '@/types/coupon';

const useCoupon = () => {
  const couponList = useRecoilValue(fetchCouponSelector);
  const couponSavedCheckList = useRecoilValue(couponSavedCheckListState);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const [localDiscountPrice, setLocalDiscountPrice] = useState(Number(totalDiscountPrice));

  const { totalOrderPrice } = useRecoilValue(orderResultState);

  const { calculateDiscountAmount } = useDiscountCalculator();
  const [couponCheckList, setCouponCheckList] = useState(() => couponSavedCheckList);
  const isValidCouponCount = couponCheckList.filter((coupon) => coupon.isChecked).length < 2;

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, coupon: Coupon) => {
    const clickedCouponId = Number(e.target.id);
    const discountAmount = calculateDiscountAmount(coupon, totalOrderPrice);
    const resultDiscount = e.target.checked ? discountAmount : discountAmount * -1;

    setLocalDiscountPrice(localDiscountPrice + resultDiscount);

    setCouponCheckList(
      couponCheckList.map((coupon) => ({
        ...coupon,
        isChecked: clickedCouponId === coupon.id ? !coupon.isChecked : coupon.isChecked,
      })),
    );
  };

  return {
    couponList,
    couponCheckList,
    isValidCouponCount,
    handleChangeChecked,
    localDiscountPrice,
  };
};

export default useCoupon;
