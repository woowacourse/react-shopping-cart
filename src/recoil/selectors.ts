import { selector } from 'recoil';
import { fetchCartItems } from '../api';
import CartItemLocalStorage, {
  CART_ITEM_SELECTED_KEY,
} from '../services/CartItemLocalStorage';
import { CartItemType } from '../types';
import { cartItemQuantity, cartItemSelected } from './atoms';

const initializeCartItemStorage = (items: CartItemType[]) => {
  const storageState = CartItemLocalStorage.get('cartItemSelected');
  if (!storageState) {
    const newStorageState = items.reduce(
      (acc, item): Record<number, boolean> => {
        return { ...acc, [item.id]: false };
      },
      {}
    );
    CartItemLocalStorage.set('cartItemSelected', newStorageState);
  }
};

export const cartListState = selector<CartItemType[]>({
  key: 'cartListState',
  get: async () => {
    const items = await fetchCartItems();
    initializeCartItemStorage(items);
    return items;
  },
});

export const cartListTotalPrice = selector({
  key: 'cartListTotalPrice',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalPrice = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelected(cartItem.id));
      const quantity = get(cartItemQuantity(cartItem.id));

      if (isSelectedItem) return acc + quantity * cartItem.product.price;
      return acc;
    }, 0);
    return totalPrice;
  },
});

export const cartListTotalQuantity = selector({
  key: 'cartListTotalQuantity',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const totalQuantity = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelected(cartItem.id));
      const quantity = get(cartItemQuantity(cartItem.id));

      if (isSelectedItem) return acc + quantity;
      return acc;
    }, 0);

    return totalQuantity;
  },
});

export const cartListNumberOfTypes = selector({
  key: 'cartListNumberOfTypes',
  get: ({ get }) => {
    const cartList = get(cartListState);
    const numberOfTypes = cartList.reduce((acc, cartItem) => {
      const isSelectedItem = get(cartItemSelected(cartItem.id));

      if (isSelectedItem) return acc + 1;
      return acc;
    }, 0);

    return numberOfTypes;
  },
});

export const shippingFee = selector({
  key: 'shippingFee',
  get: ({ get }) => {
    const totalPrice = get(cartListTotalPrice);

    if (totalPrice >= 100_000) return 0;
    return 3000;
  },
});

export const cartItemAllSelected = selector<boolean>({
  key: 'cartItemAllSelected',
  get: ({ get }) => {
    const storageState = CartItemLocalStorage.get(CART_ITEM_SELECTED_KEY);

    if (storageState) {
      const cartItemIds = Object.keys(storageState);
      const isAllSelected = cartItemIds.every((id) =>
        get(cartItemSelected(parseInt(id)))
      );
      return isAllSelected;
    }
    return false;
  },
  set: ({ set }, newValue) => {
    const storageState = CartItemLocalStorage.get(CART_ITEM_SELECTED_KEY);

    if (storageState) {
      Object.keys(storageState).forEach((id) => {
        set(cartItemSelected(parseInt(id)), newValue);
      });
    }
  },
});
