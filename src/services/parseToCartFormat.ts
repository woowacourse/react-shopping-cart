import { ProductItem } from '../types/productType';

export const parseToCartFormat = (id: number, product: ProductItem) => ({
  id,
  quantity: 1,
  product,
});
