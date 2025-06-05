import { baseAPI } from '../../../../api/baseAPI';

export async function deleteCartItem(cartId: number) {
  return baseAPI<null>({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
