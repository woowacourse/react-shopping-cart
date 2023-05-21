import { ProductItem } from '../types/productType';

export const parseToCartFormat = (id: number, productItem: ProductItem) => ({
  id,
  quantity: 1,
  product: productItem,
});
