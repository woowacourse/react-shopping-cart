import { selector } from 'recoil';
import { selectedCouponListState } from '../atoms/atoms';
import { selectedCartItemListState } from 'recoil/CartItem/atoms/atoms';
import { totalOrderPriceSelector, deliveryFeeSelector } from 'recoil/CartItem/selectors/selectors';
import { calculateDiscountPrice } from 'utils/coupon/couponCalculator/couponCalculator';
import { sortCouponsByDiscountRate } from 'utils/coupon/couponSorter/couponSorter';

export const totalDiscountPriceState = selector({
  key: 'totalDiscountPriceState',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListState);
    const selectedCartItemList = get(selectedCartItemListState);
    const totalOrderPrice = get(totalOrderPriceSelector);
    const deliveryFee = get(deliveryFeeSelector);

    return sortCouponsByDiscountRate(selectedCouponList).reduce(
      (acc, cur) => (acc += calculateDiscountPrice(cur, selectedCartItemList, totalOrderPrice, deliveryFee)),
      0,
    );
  },
});
