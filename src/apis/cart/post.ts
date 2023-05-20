import fetcher from 'apis';
import { Product } from 'types/product';

const POST_URL = '/cart-items';

export const addCartProducts = async (productId: Product['id']) => {
  const cartProducts = await fetcher(POST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic bob:486`,
    },
    body: JSON.stringify({ productId }),
  });

  return cartProducts;
};
