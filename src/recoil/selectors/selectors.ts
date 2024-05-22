import { selector, selectorFamily } from 'recoil';
import type { TCartItem } from '../../types/CartItem.type';
import type { Coupon } from '../../types/Coupon.type';
import { isSigolState, selectedCartItemListState, selectedCouponListState } from '../atoms/atoms';
import { calculateDeliveryFee } from '../../utils/calculateDeliveryFee';

export const selectedCartItemListSelector = selectorFamily<boolean, TCartItem>({
  key: 'selectedCartItemListSelector',
  get:
    (newItem: TCartItem) =>
    ({ get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      return selectedCartItemList.some((item) => item.id === newItem.id);
    },
  set:
    (newItem: TCartItem) =>
    ({ set, get }) => {
      const selectedCartItemList = get(selectedCartItemListState);
      const isSelected = selectedCartItemList.some((item) => item.id === newItem.id);

      set(
        selectedCartItemListState,
        isSelected ? selectedCartItemList.filter((item) => item.id !== newItem.id) : [...selectedCartItemList, newItem],
      );
    },
});

export const selectedCouponListSelector = selectorFamily<boolean, Coupon>({
  key: 'selectedCouponListSelector',
  get:
    (newCoupon: Coupon) =>
    ({ get }) => {
      const selectedCouponList = get(selectedCouponListState);
      return selectedCouponList.some((coupon) => coupon.id === newCoupon.id);
    },
  set:
    (newCoupon: Coupon) =>
    ({ set, get }) => {
      const selectedCouponList = get(selectedCouponListState);
      const isSelected = selectedCouponList.some((coupon) => coupon.id === newCoupon.id);

      set(
        selectedCouponListState,
        isSelected
          ? selectedCouponList.filter((coupon) => coupon.id !== newCoupon.id)
          : [...selectedCouponList, newCoupon],
      );
    },
});

export const isCouponListMaxLength = selector({
  key: 'isCouponListMaxLength',
  get: ({ get }) => {
    const selectedCouponList = get(selectedCouponListState);
    return selectedCouponList.length >= 2;
  },
});

export const deliveryFeeSelector = selector({
  key: 'deliveryFeeSelector',
  get: ({ get }) => {
    const isSigol = get(isSigolState);
    const cartItemTotalPrice = get(cartOrderTotalPriceSelector);

    return calculateDeliveryFee(cartItemTotalPrice, isSigol);
  },
});

export const cartOrderTotalPriceSelector = selector({
  key: 'selectedCartItemListTotalPriceSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
  },
});

export const cartOrderTotalCountSelector = selector({
  key: 'selectedCartItemListTotalCountSelector',
  get: ({ get }) => {
    const selectedCartItemList = get(selectedCartItemListState);
    return selectedCartItemList.reduce((acc, cur) => acc + cur.quantity, 0);
  },
});
