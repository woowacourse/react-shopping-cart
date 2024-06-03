import { selector } from 'recoil';
import { totalCartPriceState } from './totalCartPriceState';
import { selectedCouponIdListState } from '../couponList/selectedCouponIdListState';
import { selectedCartItemListState } from '../selectedCartItemList/selectedCartItemList';
import {
  calcBuyXGetYDiscountAmount,
  calcFixedDiscountAmount,
  calcPercentageDiscountAmount,
  calcShippingFeeDiscountAmount,
} from '../../utils/coupon/calcDiscountPriceByCoupon';
import { couponListState } from '../couponList/couponListState';

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
    const selectedCouponIdList = get(selectedCouponIdListState);
    const couponList = get(couponListState);
    const selectedCouponList = couponList.filter(({ id }) => selectedCouponIdList.includes(id));

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
