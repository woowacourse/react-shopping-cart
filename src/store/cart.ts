import { atom, selector, selectorFamily } from 'recoil';
import { Select } from '../components/CartItemList/CartItemList';
import { Cart } from '../types/product';
import { fetchedCartListSelector } from './fetchSelectors';

export const cartAtom = atom<Cart[]>({
  key: 'cartAtom',
  default: fetchedCartListSelector,
});

export const cartSelector = selector({
  key: 'cartSelector',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const cartsQuantity = cartList.length;

    const totalAmount = cartList.reduce(
      (a, b) => a + b.product.price * b.quantity,
      0
    );

    return { cartsQuantity, totalAmount };
  },
});

export const cartSelectorFamily = selectorFamily({
  key: 'select-family',
  get:
    (id: number) =>
    ({ get }) => {
      const cartList = get(cartAtom);

      return cartList.find((item) => item.id === id) as Cart;
    },
});

export const checkedValue = selector({
  key: 'checked-value',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const NO_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: false,
    }));

    const ALL_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: true,
    }));

    return { NO_CHECKED, ALL_CHECKED };
  },
});

export const totalAmountAtom = atom({
  key: 'totalAmount',
  default: 0,
});
