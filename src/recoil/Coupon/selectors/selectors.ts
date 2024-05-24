import { selector } from 'recoil';
import { selectedCouponListState } from '../atoms/atoms';
import { selectedCartItemListState } from '../../CartItem/atoms/atoms';
import { totalOrderPriceSelector, deliveryFeeSelector } from '../../CartItem/selectors/selectors';
import { sortCouponsByDiscountRate } from '../../../utils/coupon/couponSorter';
import { calculateDiscountPrice } from '../../../utils/coupon/couponCalculator/couponCalculator';

export const totalCouponDiscountPriceSelector = selector({
  key: 'totalCouponDiscountPriceSelector',
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
