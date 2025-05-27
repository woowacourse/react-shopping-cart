import { baseAPI } from '../../../../api/baseAPI';

export async function deleteCartItem(cartId: string) {
  await baseAPI({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
