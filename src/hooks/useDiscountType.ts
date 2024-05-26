import { isShippingFeeDiscountState } from './../recoil/coupons';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedCartItemsSelector,
  totalOrderAmountSelector,
} from './../recoil/cartItems';
import { useState } from 'react';
import { CouponType } from '../components/type';
import {
  COUPON_DISCOUNT_TYPE_NAME,
  COUPON_DISCOUNT_TYPE_PRIORITY,
} from './constants/coupon';

const useDiscountType = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const selectedCartItems = useRecoilValue(selectedCartItemsSelector);
  const [_, setShippingFeeDiscount] = useRecoilState(
    isShippingFeeDiscountState,
  );
  const [discountAmount, setDiscountAmount] = useState(totalOrderAmount);

  const fixedCouponApply = (discount: number) => {
    return (orderAmount: number) => orderAmount - discount;
  };

  const percentageCouponApply = (discount: number) => {
    return (orderAmount: number) => orderAmount * (100 - discount) * 0.01;
  };

  /**
   *
   * buyQuantity : 구매 수량
   * getQuantity : 무료로 받을 수 있는 수량
   * 만약 buyQuantity+getQuantity 개 구매한 제품이 있다면 그 중 가장 비싼 제품의 * getQuantity 만큼 할인받는다.
   */
  const buyXgetYCouponApply = (buyQuantity: number, getQuantity: number) => {
    const bulkCartItems = selectedCartItems.filter((cartItem) => {
      const quantity = cartItem.quantity;
      return quantity >= buyQuantity + getQuantity;
    });

    return (orderAmount: number) => {
      const bulkCartItemsPrice = bulkCartItems.map(
        (cartItem) => cartItem.product.price,
      );
      const discountPrice = bulkCartItemsPrice.sort().pop();
      return orderAmount - (discountPrice || 0) * getQuantity;
    };
  };

  const freeShipping = () => {
    return (orderAmount: number) => {
      return orderAmount;
    };
  };

  const selectDiscountType = (coupon: CouponType) => {
    switch (coupon.discountType) {
      case COUPON_DISCOUNT_TYPE_NAME.percentage:
        return percentageCouponApply(coupon.discount!);
      case COUPON_DISCOUNT_TYPE_NAME.buyXgetY:
        return buyXgetYCouponApply(coupon.buyQuantity!, coupon.getQuantity!);
      case COUPON_DISCOUNT_TYPE_NAME.fixed:
        return fixedCouponApply(coupon.discount!);
      case COUPON_DISCOUNT_TYPE_NAME.freeShipping:
        return freeShipping();
    }
  };

  const applyCoupon = (coupons: CouponType[]) => {
    const couponsCopy = [...coupons];
    couponsCopy.sort(
      (a, b) =>
        COUPON_DISCOUNT_TYPE_PRIORITY[a.discountType] -
        COUPON_DISCOUNT_TYPE_PRIORITY[b.discountType],
    );
    let discount = totalOrderAmount;
    let isFreeShipping = false;

    couponsCopy.forEach((coupon) => {
      const applyDiscount = selectDiscountType(coupon);
      discount = applyDiscount(discount);

      isFreeShipping = coupon.discountType === 'freeShipping';
    });

    setDiscountAmount(discount);
    setShippingFeeDiscount(isFreeShipping);
  };

  const getDiscountAmount = totalOrderAmount - discountAmount;

  return { applyCoupon, getDiscountAmount };
};

export default useDiscountType;
