import { PaginationResponse } from './../../../../api/type';
import { baseAPI } from '../../../../api/baseAPI';
import { buildQueryString } from '../../../../api/buildQueryString';
import { CartItemType } from '../types';

export async function getCartItems() {
  const initialPage = 0;
  const size = 20;
  const queryString = buildQueryString([
    { name: 'page', value: initialPage },
    { name: 'size', value: size },
  ]);

  const basePath = `/cart-items?${queryString}`;

  const data = await baseAPI<PaginationResponse<CartItemType>>({
    method: 'GET',
    path: basePath,
  });

  return data?.content ?? [];
}
