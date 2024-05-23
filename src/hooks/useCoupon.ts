import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useDiscountCalculator from './useDiscountCalculator';

import { orderResultState } from '@/recoil/cartItems/selectors';
import { couponSavedCheckListState, totalCouponDiscountState } from '@/recoil/coupons/atoms';
import { fetchCouponSelector } from '@/recoil/coupons/fetchCouponSelector';
import { Coupon } from '@/types/coupon';

const useCoupon = () => {
  const couponList = useRecoilValue(fetchCouponSelector);
  const couponSavedCheckList = useRecoilValue(couponSavedCheckListState);
  const [totalDiscountPrice, setTotalDiscountPrice] = useRecoilState(totalCouponDiscountState);
  const { totalOrderPrice } = useRecoilValue(orderResultState);

  const { calculateDiscountAmount } = useDiscountCalculator();
  const [couponCheckList, setCouponCheckList] = useState(() => couponSavedCheckList);
  const isValidCouponCount = couponCheckList.filter((coupon) => coupon.isChecked).length < 2;

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, coupon: Coupon) => {
    const clickedCouponId = Number(e.target.id);
    const discountAmount = calculateDiscountAmount(coupon, totalOrderPrice);
    const resultDiscount = e.target.checked ? discountAmount : discountAmount * -1;

    // TODO: 2개 클릭 시 어떤 순서로 할인해야 더 큰 할인 금액인지 비교 로직 추가
    setTotalDiscountPrice(totalDiscountPrice + resultDiscount);

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
    totalDiscountPrice,
  };
};

export default useCoupon;
