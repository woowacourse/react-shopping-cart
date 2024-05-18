import { CartItemType } from '@/types/cart.type';
import { ENDPOINT } from '@/api/config';
import { ERROR_MESSAGE } from '@/constants/error';
import apiFetch from '@/api/apiFetch';

export async function getCartList(): Promise<CartItemType[]> {
  const response = await apiFetch({
    url: ENDPOINT.cartItem.getList,
    options: { method: 'GET' },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.getCartList);
  }

  const data = await response.json();
  return data.content;
}

export async function postCartItem(productId: number): Promise<void> {
  const response = await apiFetch({
    url: ENDPOINT.cartItem.postItem,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.postCartItem);
  }
}

export async function deleteCartItem(cartItemId: number): Promise<void> {
  const response = await apiFetch({
    url: ENDPOINT.cartItem.deleteItem(cartItemId),
    options: {
      method: 'DELETE',
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.deleteCartItem);
  }
}

export async function patchCartItem(
  cartItemId: number,
  quantity: number
): Promise<void> {
  const response = await apiFetch({
    url: ENDPOINT.cartItem.patchItem(cartItemId),
    options: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.patchCartItem);
  }
}

export async function getCartItemCount(): Promise<number> {
  const response = await apiFetch({
    url: ENDPOINT.cartItem.getItemCount,
    options: { method: 'GET' },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.getCartItemCount);
  }

  const data = await response.json();
  return data.quantity;
}
