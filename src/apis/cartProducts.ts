import type { CartProduct } from '../types/product';

const URL = '/cart-items';

export const fetchCartProducts = async () => {
  const response = await fetch(URL);
  const data: CartProduct[] = await response.json();
  return data;
};

export const postCartProducts = async (id: number) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: id }),
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  const data = await response.json();
  return data;
};
