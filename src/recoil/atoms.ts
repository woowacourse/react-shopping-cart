import { atom, atomFamily, selectorFamily } from 'recoil';
import { CartItems } from '../types/Item';
import { Coupon } from '../types/coupon';
import { fetchItemsSelector } from './fetchSelectors';
import { getLocalStorage } from '../utils/UpdateLocalStorage';

export const itemsState = atom<CartItems[]>({
  key: 'itemsState',
  default: fetchItemsSelector,
});

export const itemDetailsState = atomFamily({
  key: 'itemDetailsState',
  default: selectorFamily({
    key: 'itemDetailsState/Default',
    get:
      (itemId) =>
      ({ get }) => {
        const items = get(itemsState);
        const item = items.find((value) => value.id === itemId);
        const localStorageValue = getLocalStorage().find(
          (value) => value.id === itemId,
        );
        return {
          quantity: item ? item.quantity : 1,
          isChecked: localStorageValue ? localStorageValue.isChecked : true,
        };
      },
  }),
});
export const couponsState = atom<Coupon[]>({
  key: 'couponsState',
  default: [],
});

export const couponDetailState = atomFamily<boolean, number>({
  key: 'couponDetailState',
  default: false,
});
