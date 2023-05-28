import { ERROR_MESSAGE } from '../constants';

export const getRequest = async <T>(path: string) => {
  const response = await fetch(`/api/${path}`);

  if (response.status >= 400) {
    throw new Error(ERROR_MESSAGE.getInfo);
  }

  const data: T = await response.json();

  return data;
};

export const postCartItem = async (productId: number) => {
  const response = await fetch('/api/carts', {
    method: 'POST',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
    }),
  });

  if (response.status >= 400) {
    throw new Error(ERROR_MESSAGE.postToCart);
  }
};

export const patchCartItemQuantity = async (
  productId: number,
  quantity: number
) => {
  const response = await fetch(`/cart-iㄴtems/${productId}`, {
    method: 'PATCH',
    headers: { 'content-Type': 'application/json' },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (response.status >= 400) {
    throw new Error(ERROR_MESSAGE.patchCartItem);
  }
};

export const deleteCartItem = async (productId: number) => {
  const response = await fetch(`/cart-iㄴtems/${productId}`, {
    method: 'DELETE',
  });

  if (response.status >= 400) {
    throw new Error(ERROR_MESSAGE.deleteCartItem);
  }
};
