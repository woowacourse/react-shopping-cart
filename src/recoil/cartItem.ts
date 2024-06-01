import { selector, AtomEffect, atomFamily, selectorFamily } from 'recoil';
import { cartListSelector } from './cartList';
import CartItemLocalStorage, {
  CART_ITEM_SELECTED_KEY,
} from '../services/CartItemLocalStorage';

/**
 * 개별 장바구니 아이템의 수량
 */
export const cartItemQuantityState = atomFamily<number, number>({
  key: 'cartItemQuantityState',
  default: selectorFamily({
    key: 'initialCartItemQuantity',
    get:
      (id) =>
      ({ get }) => {
        const cartList = get(cartListSelector);
        const item = cartList.find((item) => item.id === id);
        return item ? item.quantity : 0;
      },
  }),
});

/**
 * 개별 장바구니 아이템의 선택 여부
 */
export const cartItemSelectedState = atomFamily<boolean, number>({
  key: 'cartItemSelectedState',
  default: (id: number) => {
    const storageState = CartItemLocalStorage.get(CART_ITEM_SELECTED_KEY);
    return storageState ? storageState[id] : false;
  },
  effects: (id: number): AtomEffect<boolean>[] => [
    ({ onSet }) => {
      onSet((newValue) => {
        const storageState =
          CartItemLocalStorage.get(CART_ITEM_SELECTED_KEY) || {};

        storageState[id] = newValue;

        CartItemLocalStorage.set(CART_ITEM_SELECTED_KEY, storageState);
      });
    },
  ],
});

/**
 * 장바구니 아이템이 모두 선택되었는지
 */
export const itemsAllSelectedState = selector<boolean>({
  key: 'cartItemAllSelected',
  get: ({ get }) => {
    const storageState = CartItemLocalStorage.get(CART_ITEM_SELECTED_KEY);
    if (!storageState) return false;

    const cartItemIds = Object.keys(storageState);
    return cartItemIds.every((id) => get(cartItemSelectedState(parseInt(id))));
  },
  set: ({ set }, newValue) => {
    const storageState = CartItemLocalStorage.get(CART_ITEM_SELECTED_KEY) || {};
    Object.keys(storageState).forEach((id) => {
      set(cartItemSelectedState(parseInt(id)), newValue);
    });
  },
});

export const selectedCartItemListSelector = selector({
  key: 'selectedCartItemSelector',
  get: ({ get }) => {
    const cartList = get(cartListSelector);
    return cartList
      .filter((cartItem) => get(cartItemSelectedState(cartItem.id)))
      .map((cartItem) => {
        return {
          ...cartItem,
          quantity: get(cartItemQuantityState(cartItem.id)),
        };
      });
  },
});
