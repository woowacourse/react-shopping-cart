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
  price: number;
  shippingFee: ShippingDiscountType;
};

// TODO: 리펙터링
export const discountPriceByCouponListState = selector({
  key: 'discountPriceByCouponListState',
  get: ({ get }) => {
    let totalCartPrice = get(totalCartPriceState);
    const selectedCouponList = get(selectedCouponListState);
    const selectedCartItemList = get(selectedCartItemListState);

    const selectedCouponListSortByPriorityDesc = [...selectedCouponList].sort((a, b) => b.priority - a.priority);

    const totalDiscount: TotalDiscountPrice = { price: 0, shippingFee: 0 };

    selectedCouponListSortByPriorityDesc.forEach((coupon) => {
      let discountPrice: number | ShippingDiscountType = 0;

      switch (coupon.discountType) {
        case 'fixed':
          discountPrice = calcFixedDiscountAmount(coupon, totalCartPrice);
          totalDiscount.price += discountPrice;
          break;
        case 'percentage':
          discountPrice = calcPercentageDiscountAmount(coupon, totalCartPrice);
          totalDiscount.price += discountPrice;
          break;
        case 'freeShipping':
          discountPrice = calcShippingFeeDiscountAmount(coupon);
          totalDiscount.shippingFee = discountPrice;

          break;
        case 'buyXgetY':
          discountPrice = calcBuyXGetYDiscountAmount(coupon, selectedCartItemList);
          totalDiscount.price += discountPrice;

          totalCartPrice -= discountPrice;
          break;
        default:
          break;
      }
    });

    return totalDiscount;
  },
});
