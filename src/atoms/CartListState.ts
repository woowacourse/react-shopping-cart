import { atom, selector, selectorFamily } from 'recoil';
import { CartProductItem } from '../types/productType';

const cartListStateInitValue: CartProductItem[] = [];

const getCartListFromMocks =
  () =>
  ({ setSelf }: { setSelf: (cartList: CartProductItem[]) => void }) => {
    const initCartListState = async () => {
      const response = await fetch('/api/carts');

      if (response.status >= 400) {
        throw new Error('장바구니 정보를 가져오는데 실패했습니다.');
      }

      const cartList = await response.json();

      if (!cartList) setSelf([]);
      setSelf(cartList);
    };

    initCartListState();
  };

export const cartState = atom({
  key: 'CartState',
  default: cartListStateInitValue,
  effects: [getCartListFromMocks()],
});

export const cartStateLength = selector({
  key: 'CartStateLength',
  get: ({ get }) => {
    const cartStateLength = get(cartState).length;

    return cartStateLength;
  },
});

export const cartItemQuantityStateFamily = selectorFamily({
  key: 'CartItemQuantityStateFamily',
  get:
    (id: number) =>
    ({ get }) => {
      const cartItem = get(cartState).filter(
        (cartItem) => cartItem.id === id
      )[0];

      if (!cartItem) return 0;
      return cartItem.quantity;
    },
});
