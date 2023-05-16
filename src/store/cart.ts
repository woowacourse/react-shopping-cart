import { atom, atomFamily, selector } from 'recoil';
import { Cart } from '../types/product';
import localStorageEffect from './localStorageEffect';

export const cartListAtom = atom<number[]>({
  key: 'cart/IDList',
  default: [],
  effects: [localStorageEffect('cart')],
});

export const cartAtomFamily = atomFamily<Cart, number>({
  key: 'cart/item',
  default: {
    id: 0,
    quantity: 0,
    product: { id: 0, name: '', price: 0, imageUrl: '' },
  },
  effects_UNSTABLE: (id) => [localStorageEffect(`cartItem_${id}`)],
});

export const cartSelector = selector({
  key: 'cartSelector',
  get: ({ get }) => {
    const cartIDList = get(cartListAtom);
    const cartList = cartIDList.map((id) => get(cartAtomFamily(id)));

    const cartsQuantity = cartIDList.length;

    const totalAmout = cartList.reduce(
      (a, b) => a + b.product.price * b.quantity,
      0
    );
    return { cartsQuantity, totalAmout };
  },
});
