import { CART_KEY } from 'constants/storeKey';
import { AtomEffect, atom, selectorFamily } from 'recoil';
import { CartProducts, Product } from 'types/product';
import persistAtomEffect from './effects/persistAtomEffect';

const zeroQuantityFilterEffect: AtomEffect<CartProducts> = ({ onSet, setSelf }) => {
  onSet((cartProducts) => {
    const filteredCart = [...cartProducts].filter(([id, cartProduct]) => cartProduct.quantity > 0);

    setSelf(new Map(filteredCart));
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

export const checkedCartProductsTotalPrice = selectorFamily<number, Set<Product['id']>>({
  key: 'cartTotalPriceState',
  get:
    (checkedBoxes) =>
    ({ get }) => {
      const cartProducts = get(cartProductsState);

      return [...cartProducts.values()].reduce((acc, { product, quantity }) => {
        if (!checkedBoxes.has(product.id)) return acc;

        return acc + product.price * quantity;
      }, 0);
    },
});
