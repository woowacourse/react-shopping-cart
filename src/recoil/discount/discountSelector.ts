import { selector } from 'recoil';
import {
  deliveryFeeSelector,
  orderedPriceSelector,
} from '../price/priceSelector';
import { selectedCouponListAtom } from '../coupon/couponListAtom';

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
    const fixedDiscount = get(fixedDiscountSelector);
    const freeShippingDiscount = get(freeShippingDiscountSelector);

    return percentageDiscount + fixedDiscount + freeShippingDiscount;
  },
});
