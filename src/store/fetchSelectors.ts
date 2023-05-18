import { selector, selectorFamily } from 'recoil';
import { fetchCartItem, fetchCartList } from '../api/cartList';
import fetchProductList from '../api/productList';
import { Cart, Product } from '../types/product';

export const fetchedProductListSelector = selector({
  key: 'fetchedProductList',
  get: async () => {
    const data = await fetchProductList<Product[]>();

    return data;
  },
});

export const fetchedCartListSelector = selector({
  key: 'fetchedCartList',
  get: async () => {
    const data = await fetchCartList<Cart[]>();

    return data;
  },
});

// export const fetchedCartItemSelector = selectorFamily({
//   key: 'fetchedCartItem',
//   get:
//     (id: number) =>
//     ({ get }) => {
//       const data = get(cartAtom).find((item) => item.id === id);

//       return data as Cart;
//     },
// });

export const fetchedCartItemSelector = selectorFamily({
  key: 'fetchedCartItem',
  get: (id: number) => async () => {
    const data = await fetchCartItem<Cart>(id);

    return data;
  },
});
