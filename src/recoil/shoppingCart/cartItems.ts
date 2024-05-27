import ShoppingCartFetcher from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { STORAGE_KEY } from '@constants/storage';
import { localStorageEffect } from '@recoil/common/localStorageEffect';
import { quantityAtomFamily } from '@recoil/shoppingCart/quantity';
import { atom, selector } from 'recoil';

export const cartItemsSelector = selector<CartItem[]>({
  key: 'cartItemsSelector',
  get: async () => {
    const cartItems = await ShoppingCartFetcher.getCartItems();
    return cartItems;
  },
});

export const cartItemsAtom = atom<CartItem[]>({
  key: 'cartItemsAtom',
  default: cartItemsSelector,
});

/* selected */
export const selectedIdsAtom = atom<Set<number>>({
  key: 'selectedIdsAtom',
  default: new Set(JSON.parse(localStorage.getItem(STORAGE_KEY.selectedItems) ?? '[]')) ?? new Set(),
  effects: [localStorageEffect(STORAGE_KEY.selectedItems)],
});

export const selectedItemsSelector = selector({
  key: 'selectedItemsSelector',
  get: ({ get }) => {
    const cartItems = get(cartItemsAtom);

    const selectedItems = cartItems
      .filter((cartItem) => get(selectedIdsAtom).has(cartItem.id))
      .map((item) => ({ ...item, quantity: get(quantityAtomFamily(item.id)) }));

    return selectedItems;
  },
});
