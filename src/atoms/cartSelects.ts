import { atom, selector } from 'recoil';
import { cartState } from './cartState';

export const cartSelects = atom<Set<number>>({
  key: 'cartSelects',
  default: new Set<number>(),
});

export const totalPrice = selector({
  key: 'totalPrice',
  get: ({ get }) => {
    const cartSelectsSet = get(cartSelects);
    const cart = get(cartState({ action: 'GET' }));

    return Array.from(cartSelectsSet).reduce((acc, cartSelectId) => {
      const cartItem = cart.find((item) => item.id === cartSelectId);
      let price = 0;
      if (cartItem) {
        price = cartItem.quantity * cartItem.product.price;
      }
      return acc + price;
    }, 0);
  },
});

export const deliveryFee = selector({
  key: 'deliveryFee',
  get: ({ get }) => {
    const cartItemsPrice = get(totalPrice);
    return cartItemsPrice > 30000 || cartItemsPrice === 0 ? 0 : 3000;
  },
});

export const checkoutPrice = selector({
  key: 'checkoutPrice',
  get: ({ get }) => {
    const cartItemsPrice = get(totalPrice);
    const deliveryPrice = get(deliveryFee);

    return cartItemsPrice + deliveryPrice;
  },
});
