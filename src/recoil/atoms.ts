import { atom, atomFamily, selectorFamily, useRecoilValue } from 'recoil';
import { CartItems, ItemDetailsStateType } from '../types/Item';
import { Coupon, CouponDetailState } from '../types/coupon';
import { fetchItemsSelector } from './fetchSelectors';
import { getLocalStorage } from '../utils/UpdateLocalStorage';

export const itemsState = atom<CartItems[]>({
  key: 'itemsState',
  default: fetchItemsSelector,
});

// export const itemDetailsState = atomFamily<ItemDetailsStateType, number>({
//   key: 'itemDetailsState',
//   default: {
//     quantity: 1,
//     isChecked: true,
//   },
// });
export const itemDetailsState = atomFamily({
  key: 'itemDetailsState',
  default: selectorFamily({
    key: 'itemDetailsState/Default',
    get:
      (itemId) =>
      ({ get }) => {
        const items = get(itemsState);
        console.log(items);
        const item = items.find((value) => value.id === itemId);
        console.log(item);
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

export const couponDetailState = atomFamily<CouponDetailState, number>({
  key: 'couponDetailState',
  default: {
    isChecked: false,
    disabled: false,
  },
});
