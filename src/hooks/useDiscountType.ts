import { isShippingFeeDiscountState } from './../recoil/coupons';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedCartItemsSelector,
  totalOrderAmountSelector,
} from './../recoil/cartItems';
import { useState } from 'react';
import { CouponType } from '../components/type';
import { COUPON_DISCOUNT_TYPE } from './constants/coupon';

const useDiscountType = () => {
  const totalOrderAmount = useRecoilValue(totalOrderAmountSelector);
  const [discountAmount, setDiscountAmount] = useState(totalOrderAmount);
  const cartItemsBuyQuantity = useRecoilValue(selectedCartItemsSelector);
  const [_, setShippingFeeDiscount] = useRecoilState(
    isShippingFeeDiscountState,
  );

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
    const bulkCartItems = cartItemsBuyQuantity.filter((cartItem) => {
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
      case COUPON_DISCOUNT_TYPE.percentage.name:
        return percentageCouponApply(coupon.discount!);
      case COUPON_DISCOUNT_TYPE.buyXgetY.name:
        return buyXgetYCouponApply(coupon.buyQuantity!, coupon.getQuantity!);
      case COUPON_DISCOUNT_TYPE.fixed.name:
        return fixedCouponApply(coupon.discount!);
      case COUPON_DISCOUNT_TYPE.freeShipping.name:
        return freeShipping();
    }
  };

  const applyCoupon = (coupons: CouponType[]) => {
    coupons.sort(
      (a, b) =>
        COUPON_DISCOUNT_TYPE[a.discountType].priority -
        COUPON_DISCOUNT_TYPE[b.discountType].priority,
    );
    let discount = totalOrderAmount;
    let isFreeShipping = false;

    coupons.forEach((coupon) => {
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
