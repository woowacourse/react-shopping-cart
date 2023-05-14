import { CART_KEY } from 'constants/storeKey';
import { AtomEffect, atom } from 'recoil';
import { CartProducts } from 'types/product';

const zeroQuantityFilterEffect: AtomEffect<CartProducts> = ({ onSet, setSelf }) => {
  onSet((cartProducts) => {
    const filteredCart = [...cartProducts].filter(([id, cartProduct]) => cartProduct.quantity > 0);

    setSelf(new Map(filteredCart));
  });
};

type Persister = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

type PersistAtomEffectParams<T> = {
  key: string;
  initialValue: T;
  options: {
    persister?: Persister;
    serializer?: (value: T) => string;
    deserializer?: (serializedValue: string) => T;
  };
};

const persistAtomEffect =
  <T>({ key, initialValue, options }: PersistAtomEffectParams<T>): AtomEffect<T> =>
  ({ onSet, setSelf, trigger }) => {
    const { persister = localStorage, serializer = JSON.stringify, deserializer = JSON.parse } = options;

    if (trigger === 'get') {
      const storedValue = persister.getItem(key);
      const state = storedValue ? deserializer(storedValue) : initialValue;

      setSelf(state);
    }

    onSet((newValue) => {
      persister.setItem(key, serializer(newValue));
    });
  };

const mapToString = (value: CartProducts) => {
  return JSON.stringify(Array.from(value));
};

const stringToMap = (value: string): CartProducts => {
  return new Map(JSON.parse(value));
};

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: new Map(),
  effects: [
    zeroQuantityFilterEffect,
    persistAtomEffect<CartProducts>({
      key: CART_KEY,
      initialValue: new Map(),
      options: { serializer: mapToString, deserializer: stringToMap },
    }),
  ],
});
