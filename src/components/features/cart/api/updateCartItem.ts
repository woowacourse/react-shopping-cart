import { baseAPI } from '../../../../api/baseAPI';

export async function updateCartItem(id: string, quantity: number) {
  await baseAPI({
    method: 'PATCH',
    path: `/cart-items/${id}`,
    body: {
      quantity,
    },
  });
}
