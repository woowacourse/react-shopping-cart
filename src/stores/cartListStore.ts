import { atom, selector, selectorFamily } from 'recoil';

type CartList = { [key: number]: { quantity: number } };

export const cartListAtom = atom<CartList>({
  key: 'cartListAtom',
  default: {},
});

export const carListTotalQuantitySelector = selector({
  key: 'carListTotalQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    return Object.keys(cartList).reduce((acc, curr) => {
      return acc + cartList[parseInt(curr, 10)].quantity;
    }, 0);
  },
});

export const productQuantitySelector = selectorFamily({
  key: 'productQuantitySelector',
  get:
    (itemId: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);

      return cartList[itemId]?.quantity ?? 0;
    },
});
