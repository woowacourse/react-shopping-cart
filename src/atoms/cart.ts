import { AtomEffect, DefaultValue, atom, selector } from 'recoil';
import { Cart } from '../types/cart';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const CART_LOCAL_STORAGE_KEY = 'CART';

export const cartState = atom<Cart[]>({
  key: 'CartListState',
  default: [],
  effects: [localStorageEffect<Cart[]>(CART_LOCAL_STORAGE_KEY)],
});

export const totalAmountState = selector({
  key: 'TotalAmountState',
  get: ({ get }) => {
    const cart = get(cartState);

    const totalItems = cart.length;
    const totalPrice = cart.reduce((total, { isSelected, product, quantity }) => {
      if (!isSelected) return total;

      return total + product.price * quantity;
    }, 0);

    return {
      totalItems,
      totalPrice,
    };
  },
});

export const cartSelectedState = selector({
  key: 'CartSelectedState',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.map(({ isSelected }) => isSelected);
  },
  set: ({ get, set }, newValue) => {
    const cart = get(cartState);
    const newCart =
      newValue instanceof DefaultValue
        ? newValue
        : cart.map((prev, i) => ({
            ...prev,
            isSelected: newValue[i],
          }));

    set(cartState, newCart);
  },
});

export const cartStatus = selector({
  key: 'CartStatus',
  get: ({ get }) => {
    const selectedList = get(cartSelectedState);

    const selectedAmount = selectedList.filter((isSelected) => isSelected === true).length;
    const allSelected = selectedList.every((isSelected) => isSelected === true);

    return {
      selectedAmount,
      allSelected,
    };
  },
});
