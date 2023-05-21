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

export const cartBadge = selector({
  key: 'cartBadge',
  get: ({ get }) => {
    const numberOfItem = get(cartState).length;
    return numberOfItem > 99 ? '99+' : numberOfItem;
  },
});

export const cartPrice = selector({
  key: 'cartTotalPrice',
  get: ({ get }) => {
    const totalCart = get(cartState);
    const checkedIdList = get(checkedItemIdList);
    const totalPrice = totalCart.reduce((sum, item) => {
      if (checkedIdList.includes(item.id)) {
        return (sum += item.quantity * item.product.price);
      }
      return sum;
    }, 0);

    return totalPrice;
  },
});

export const checkedItemIdList = atom({
  key: 'checkedCartItemList',
  default: selector({
    key: 'idList',
    get: ({ get }): number[] => {
      const idList = get(cartState).map((item) => item.id);
      return idList;
    },
  }),
});
