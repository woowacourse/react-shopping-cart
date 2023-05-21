import { CART_KEY } from 'constants/storeKey';
import { atom, selector, selectorFamily } from 'recoil';
import { CartProducts, Product } from 'types/product';
import persistAtomEffect from './effects/persistAtomEffect';
import { getCartProducts } from 'apis/cart/get';

const mapToString = (value: CartProducts) => {
  return JSON.stringify(Array.from(value));
};

const stringToMap = (value: string): CartProducts => {
  return new Map(JSON.parse(value));
};

const defaultCartState = selector({
  key: 'defaultCartState',
  get: () => getCartProducts(),
});

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: defaultCartState,
  effects: [
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
    (checkedProducts) =>
    ({ get }) => {
      const cartProducts = get(cartProductsState);

      return [...cartProducts.values()].reduce((acc, { product, quantity }) => {
        if (!checkedProducts.has(product.id)) return acc;

        return acc + product.price * quantity;
      }, 0);
    },
});
