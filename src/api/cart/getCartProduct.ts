import {CartProduct} from '../../type/cart';
import {ProductsResponse} from '../../type/products';
import {apiClient} from '../apiClient';

export const getCartProduct = (
  page = 0,
  size = 20
): Promise<ProductsResponse<CartProduct>> =>
  apiClient.get({endPoint: `/cart-items?page=${page}&size=${size}`});
