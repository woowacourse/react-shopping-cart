import { atom, selector, selectorFamily } from 'recoil';
import { CartProducts, Product } from 'types/product';
import { getCartProducts } from 'apis/cart';

const defaultCartState = selector({
  key: 'defaultCartState',
  get: () => getCartProducts(),
});

export const cartProductsState = atom<CartProducts>({
  key: 'cartState',
  default: defaultCartState,
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
