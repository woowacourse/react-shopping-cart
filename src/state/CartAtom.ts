import { CART_KEY } from 'constants/storeKey';
import { AtomEffect, atom } from 'recoil';
import { CartProducts } from 'types/product';
import store from 'utils/localStorage';

const zeroQuantityFilterEffect: AtomEffect<CartProducts> = ({ onSet, setSelf }) => {
  onSet((cartProducts) => {
    const filteredCart = [...cartProducts].filter(([id, cartProduct]) => cartProduct.quantity > 0);

    setSelf(new Map(filteredCart));
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

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: new Map(),
  effects: [zeroQuantityFilterEffect, localStorageEffect<CartProducts>(CART_KEY, new Map())],
});
