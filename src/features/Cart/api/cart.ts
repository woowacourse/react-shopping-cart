import { CartResponse } from '../../../features/Cart/types/Cart.types';
import { ProductQuery, UpdateCartItem } from '../../../features/Cart/types/Product.types';

import { fetcher } from '../../../api/fetcher';

export const updateCartItem = async ({ cartId, newQuantity }: UpdateCartItem) => {
  await fetcher.patch({
    path: `cart-items/${cartId}`,
    body: {
      quantity: newQuantity,
    },
  });
};

export const getCartItemList = async ({
  page = 0,
  size = 20,
  sort = '',
}: Partial<ProductQuery> = {}) => {
  const data = await fetcher.get<CartResponse>({
    path: 'cart-items',
    query: { page, size, sort },
  });

  return data.content;
};

export const deleteCartItem = async (cartItemId: number) => {
  await fetcher.delete({ path: `cart-items/${cartItemId}` });
};
