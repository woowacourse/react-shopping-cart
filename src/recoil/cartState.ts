import { DefaultValue, atom, selector, selectorFamily } from 'recoil';
import { CartItem } from '../types/Cart';
import cartToggleState from './cartToggleState';

export const cartStateListSelector = selector<CartItem[]>({
  key: 'cartStateListSelector',

  get: async (): Promise<CartItem[]> => {
    const data = await fetch('/cart-items', { method: 'GET' });
    return data.json();
  },
});

const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: cartStateListSelector,
});

export const cartLengthSelector = selector({
  key: 'cartLengthSelector',

  get: ({ get }) => Object.keys(get(cartState)).length,
});

export const productCountSelector = selectorFamily<number, number>({
  key: 'productCountSelector',

  get:
    (productId) =>
    ({ get }) => {
      const list = get(cartState);
      const product = list.find(({ id }) => id === productId);
      return product ? product.quantity : 0;
    },

  set:
    (productId) =>
    ({ get, set }, newCount) => {
      let newCart = [...get(cartState)];

      if (newCount === 0 || newCount instanceof DefaultValue) {
        newCart = newCart.filter(({ id }) => id !== productId);
      } else {
        const productIndex = newCart.findIndex(({ id }) => id === productId);

        if (productIndex === -1) return;

        newCart[productIndex] = { ...newCart[productIndex], quantity: newCount };
      }

      set(cartState, newCart);
    },
});

export const productPriceSelector = selectorFamily<number, number>({
  key: 'productPriceSelector',

  get:
    (productId) =>
    ({ get }) => {
      const product = get(cartState).find(({ id }) => id === productId);

      if (!product) return 0;

      const {
        quantity,
        product: { price },
      } = product;

      return quantity * price;
    },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',

  get: ({ get }) => {
    const toggledProducts = Object.entries(get(cartToggleState))
      .filter(([id, isToggled]) => isToggled)
      .map(([id]) => id);

    return get(cartState).reduce((sum, { id }) => {
      if (toggledProducts.includes(id.toString())) {
        return sum + get(productPriceSelector(id));
      }
      return sum;
    }, 0);
  },
});

export default cartState;
