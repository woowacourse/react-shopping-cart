import { baseAPI } from '../../../../api/baseAPI';

export async function deleteCartItem(cartId: number) {
  await baseAPI({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
