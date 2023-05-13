import { selector, selectorFamily } from 'recoil';
import { cartState } from '../atoms';
import { Product } from '../../types/product';

export const productListQuery = selector<Product[]>({
  key: 'productList',
  get: async () => {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error('상품 목록을 불러올 수 없습니다.');
    }

    const products = await response.json();

    return products;
  },
});

export const productQuantityInCart = selectorFamily({
  key: 'productQuantityInCart',
  get:
    (productId: number) =>
    ({ get }) => {
      const cart = get(cartState);

      const product = cart.find(
        (cartItem) => cartItem.product.id === productId,
      );

      if (!product) return 0;

      return product.quantity;
    },
});
