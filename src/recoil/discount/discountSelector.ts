import { selector } from 'recoil';

import { selectedCouponListAtom } from '../coupon/couponListAtom';
import { cartItemSelectedIdListAtom } from '../cartItem/cartItemAtom';
import { cartItemListState } from '../cartItemList/cartItemListSelector';
import {
  deliveryFeeSelector,
  orderedPriceSelector,
} from '../price/priceSelector';

export const percentageDiscountSelector = selector<number>({
  key: 'percentageDiscount',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);
    const selectedCouponList = get(selectedCouponListAtom);

    const discountedPrice = selectedCouponList
      .filter((coupon) => coupon.discountType === 'percentage')
      .reduce((result, { discount }) => {
        return result * (1 - (discount ?? 0) / 100);
      }, 1);

    return orderedPrice * (1 - discountedPrice);
  },
});

export const fixedDiscountSelector = selector<number>({
  key: 'fixedDiscount',
  get: ({ get }) => {
    const orderedPrice = get(orderedPriceSelector);
    const selectedCouponList = get(selectedCouponListAtom);

    const discountAmount = selectedCouponList
      .filter(
        (coupon) =>
          coupon.discountType === 'fixed' &&
          orderedPrice >= (coupon.minimumAmount ?? 0),
      )
      .reduce((result, { discount }) => {
        return result + (discount ?? 0);
      }, 0);

    return discountAmount;
  },
});

export const bogoDiscountSelector = selector<number>({
  key: 'bogoDiscount',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListAtom);
    const cartItemList = get(cartItemListState);
    const selectedCartItemIdList = get(cartItemSelectedIdListAtom);
    const selectedItemList = cartItemList.filter(({ id }) =>
      selectedCartItemIdList.includes(id),
    );

    // TODO: 2개인 경우, quantity 올려주는 로직 추가
    // const { increaseQuantity } = set(cartItemQuan);

    const coupon = selectedCouponList.find(
      (coupon) => coupon.discountType === 'buyXgetY',
    );

    const maxPrice = coupon
      ? selectedItemList.reduce((max, { id, price, quantity }) => {
          // if (quantity === coupon.buyQuantity ?? 0) {
          //   increaseQuantity(id);
          // }
          return quantity >= (coupon?.buyQuantity ?? 0)
            ? Math.max(max, price)
            : max;
        }, 0)
      : 0;

    return maxPrice * (coupon?.getQuantity ?? 1);
  },
});

export const freeShippingDiscountSelector = selector<number>({
  key: 'freeShippingDiscount',
  get: ({ get }) => {
    const deliveryFee = get(deliveryFeeSelector);
    const selectedCouponList = get(selectedCouponListAtom);

    return selectedCouponList.find(
      (coupon) => coupon.discountType === 'freeShipping',
    )
      ? deliveryFee
      : 0;
  },
});

export const totalDiscountSelector = selector<number>({
  key: 'totalDiscount',
  get: ({ get }) => {
    const percentageDiscount = get(percentageDiscountSelector);
    const bogoDiscount = get(bogoDiscountSelector);
    const fixedDiscount = get(fixedDiscountSelector);
    const freeShippingDiscount = get(freeShippingDiscountSelector);

    return (
      percentageDiscount + bogoDiscount + fixedDiscount + freeShippingDiscount
    );
  },
});
