import { selector, atom } from 'recoil';
import { fetchCart } from '../apis/cart';

export const cartState = atom({
  key: 'cart',
  default: selector({
    key: 'getMockCart',
    get: async () => {
      const cart = await fetchCart();

      return cart;
    },
  }),
});

export const cartItemLength = selector({
  key: 'cartItemLength',
  get: ({ get }): string | number => {
    const numberOfItem = get(cartState).length;
    return numberOfItem > 99 ? '99+' : numberOfItem;
  },
});

export const checkedItemIdList = atom({
  key: 'checkedItemIdList',
  default: selector({
    key: 'checkedIdList',
    get: ({ get }): number[] => {
      const idList = get(cartState).map((item) => item.id);
      return idList;
    },
  }),
});

export const cartPrice = selector({
  key: 'cartPrice',
  get: ({ get }): number => {
    const cart = get(cartState);
    const checkedIdList = get(checkedItemIdList);

    const totalPrice = cart
      .filter((item) => checkedIdList.includes(item.id))
      .reduce((sum, item) => {
        return (sum += item.quantity * item.product.price);
      }, 0);

    return totalPrice;
  },
});
