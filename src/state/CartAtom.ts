import { CART_KEY } from 'constants/storeKey';
import { AtomEffect, atom, selector, selectorFamily } from 'recoil';
import { CartProduct } from 'types/product';
import store from 'utils/localStorage';

const zeroQuantityFilterEffect: AtomEffect<CartProduct[]> = ({ onSet, setSelf }) => {
  onSet((newValue) => {
    setSelf(newValue.filter((v) => v.quantity > 0));
  });
};

const localStorageEffect =
  <T>(key: string, initialValue: T): AtomEffect<T> =>
  ({ onSet, setSelf, trigger }) => {
    if (trigger === 'get') {
      const storageValue = store.getStorage<T>(key) ?? initialValue;
      setSelf(storageValue);
    }

    onSet((newValue) => {
      store.setStorage(key, newValue);
    });
  };

export const cartState = atom<CartProduct[]>({
  key: 'cartState',
  default: [],
  effects: [zeroQuantityFilterEffect, localStorageEffect<CartProduct[]>(CART_KEY, [])],
});

export const getCartProductById = selectorFamily({
  key: 'getCartProductById',
  get:
    (id: CartProduct['id']) =>
    ({ get }) => {
      const cart = get(cartState);

      return cart.find((product) => product.id === id);
    },
});

export const cartProductCountState = selector<number>({
  key: 'cartProductCountState',
  get: ({ get }) => {
    return get(cartState).length;
  },
});
