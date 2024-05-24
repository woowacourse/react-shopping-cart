import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { checkedCartItemsState, orderResultState } from '@/recoil/cartItems/selectors';
import { couponSavedCheckListState } from '@/recoil/coupons/atoms';
import { totalDiscountPriceState } from '@/recoil/coupons/selectors';
import { Coupon } from '@/types/coupon';
import couponDiscountCalculator from '@components/Coupon/utils/couponDiscountCalculator';

const useCoupon = (couponList: Coupon[]) => {
  const couponSavedCheckList = useRecoilValue(couponSavedCheckListState);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const [localDiscountPrice, setLocalDiscountPrice] = useState(Number(totalDiscountPrice));
  const checkedCartItems = useRecoilValue(checkedCartItemsState);

  const { totalOrderPrice } = useRecoilValue(orderResultState);

  const { calculateDiscountAmount } = couponDiscountCalculator(couponList);
  const [couponCheckList, setCouponCheckList] = useState(() => couponSavedCheckList);
  const isValidCouponCount = couponCheckList.filter((coupon) => coupon.isChecked).length < 2;

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, coupon: Coupon) => {
    const clickedCouponId = Number(e.target.id);
    const discountAmount = calculateDiscountAmount(coupon, totalOrderPrice, checkedCartItems);
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
    couponCheckList,
    isValidCouponCount,
    handleChangeChecked,
    localDiscountPrice,
  };
};

export default useCoupon;
