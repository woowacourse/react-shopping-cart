import { selector } from 'recoil';
import { totalCartPriceState } from './totalCartPriceState';
import { selectedCouponListState } from '../couponList/selectedCouponListState';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';
import {
  calcBuyXGetYDiscountAmount,
  calcFixedDiscountAmount,
  calcPercentageDiscountAmount,
  calcShippingFeeDiscountAmount,
} from '../../utils/coupon/calcDiscountPriceByCoupon';

export type ShippingDiscountType = 'free' | number;

export type TotalDiscountPrice = {
  coupon: number;
  shippingFee: ShippingDiscountType;
};

// TODO: 리펙터링
export const discountPriceByCouponListState = selector({
  key: 'discountPriceByCouponListState',
  get: ({ get }) => {
    let totalCartPrice = get(totalCartPriceState);
    const selectedCouponList = get(selectedCouponListState);
    const selectedCartItemList = get(selectedCartItemListState);

    selectedCouponList.sort((a, b) => a.priority - b.priority);

    const totalDiscount: TotalDiscountPrice = { coupon: 0, shippingFee: 0 };

    selectedCouponList.forEach((coupon) => {
      let discountPrice: number | ShippingDiscountType = 0;

      switch (coupon.discountType) {
        case 'fixed':
          discountPrice = calcFixedDiscountAmount(coupon, totalCartPrice);
          totalCartPrice -= discountPrice;
          totalDiscount.coupon += discountPrice;
          break;
        case 'percentage':
          discountPrice = calcPercentageDiscountAmount(coupon, totalCartPrice);
          totalCartPrice -= discountPrice;
          totalDiscount.coupon += discountPrice;
          break;
        case 'freeShipping':
          discountPrice = calcShippingFeeDiscountAmount(coupon);
          totalDiscount.shippingFee = discountPrice;
          break;
        case 'buyXgetY':
          discountPrice = calcBuyXGetYDiscountAmount(coupon, selectedCartItemList);
          totalCartPrice -= discountPrice;
          totalDiscount.coupon += discountPrice;
          break;
        default:
          break;
      }
    });

    return totalDiscount;
  },
});
