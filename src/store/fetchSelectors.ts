import { selector } from 'recoil';
import { fetchCartList } from '../api/cartList';
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
