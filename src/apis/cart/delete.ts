import fetcher from 'apis';
import { Product } from 'types/product';

const DELETE_URL = '/cart-items';

export const removeCartProduct = async (cartProductId: Product['id']) => {
  const cartProducts = await fetcher(`${DELETE_URL}/${cartProductId}`, {
    method: 'DELETE',

    headers: {
      Authorization: `Basic bob:486`,
    },
  });

  return cartProducts;
};
