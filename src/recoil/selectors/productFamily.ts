import { selectorFamily } from 'recoil';
import type { Product } from '../../type';
import productsQuery from '../queries/productsQuery';

export const productFamily = selectorFamily<Product | null, number>({
  key: 'productFamily',
  get:
    (productId: number) =>
    ({ get }) => {
      const products = get(productsQuery);
      const product = products.find((p) => p.id === productId);
      return product ?? null;
    },
});
