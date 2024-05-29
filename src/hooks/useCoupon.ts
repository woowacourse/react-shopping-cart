import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { checkedCartItemsState, orderResultState } from '@/recoil/cartItems/selectors';
import { couponChecklistState } from '@/recoil/coupons/atoms';
import { totalDiscountPriceState } from '@/recoil/coupons/selectors';
import { Coupon, CouponClient } from '@/types/coupon';
import { couponApplicabilityChecker } from '@/utils/coupons/couponApplicabilityChecker';
import couponDiscountCalculator from '@/utils/coupons/couponDiscountCalculator';

const useCoupon = (couponList: Coupon[]) => {
  const { isCouponApplicable } = couponApplicabilityChecker(couponList);

  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const couponCheckList = useRecoilValue(couponChecklistState);
  const totalDiscountPrice = useRecoilValue(totalDiscountPriceState);
  const { totalOrderPrice } = useRecoilValue(orderResultState);

  const [localDiscountPrice, setLocalDiscountPrice] = useState(Number(totalDiscountPrice));
  const [localCouponChecklist, setLocalCouponChecklist] = useState(couponCheckList);

  const isValidCouponCount = localCouponChecklist.filter((coupon) => coupon.isChecked).length < 2;
  const { calculateDiscountAmount } = couponDiscountCalculator(couponList);

  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, coupon: Coupon) => {
    const clickedCouponId = Number(e.target.id);
    const discountAmount = calculateDiscountAmount(coupon, totalOrderPrice, checkedCartItems);
    const resultDiscount = e.target.checked ? discountAmount : discountAmount * -1;

    setLocalDiscountPrice(localDiscountPrice + resultDiscount);
    setLocalCouponChecklist((prev) =>
      prev.map((coupon) => ({
        ...coupon,
        isChecked: clickedCouponId === coupon.id ? !coupon.isChecked : coupon.isChecked,
      })),
    );
  };

  const isValidCoupon = (coupon: CouponClient) => {
    return isValidCouponCount
      ? isCouponApplicable({
          coupon,
          totalOrderPrice,
          checkedCartItems,
        })
      : coupon.isChecked;
  };

  return {
    localDiscountPrice,
    localCouponChecklist,
    handleChangeChecked,
    isValidCoupon,
  };
};

export default useCoupon;
