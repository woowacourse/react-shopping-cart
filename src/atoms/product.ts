import { selector, selectorFamily } from 'recoil';
import { cartState } from './cart';
import { Product } from '../types/product';

const getProducts = async () => {
  const response = await fetch('api/products');

  if (!response.ok) throw Error('상품 목록을 불러오지 못하였습니다.');

  const products = await response.json();
  return products as Product[];
};

export const fetchProductSelector = selector({
  key: 'FetchProductSelector',
  get: getProducts,
});

export const cartQuantityReadOnlyState = selectorFamily({
  key: 'CartQuantityReadOnlyState',
  get:
    (id) =>
    ({ get }) => {
      const quantity = get(cartState).find(({ product }) => product.id === id)?.quantity;

      return quantity || 0;
    },
});
