import { generateBasicToken } from '../../utils/auth';
import { CartItem } from '../../type';

import { fetchData } from '../';
import { ERROR_MESSAGE } from '../fetchData/fetchData.constants';
import { USER_ID, USER_PASSWORD, API_ROUTE } from './shoppingCart.constants';

export async function fetchCartItems(): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetchData({ url: API_ROUTE.CART_ITEMS, method: 'GET', token });
  const cartItemsData = await response.json();
  return cartItemsData.content;
}

export async function addCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  await fetchData({
    url: API_ROUTE.CART_ITEMS,
    method: 'POST',
    body: { productId },
    token,
    defaultErrorMessage: ERROR_MESSAGE.ADD_TO_CART_FAILED,
  });
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  await fetchData({
    url: `${API_ROUTE.CART_ITEMS}/${cartItemId}`,
    method: 'DELETE',
    token,
    defaultErrorMessage: ERROR_MESSAGE.REMOVE_FROM_CART_FAILED,
  });
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  await fetchData({
    url: `${API_ROUTE.CART_ITEMS}/${cartItemId}`,
    method: 'PATCH',
    body: { quantity },
    token,
    defaultErrorMessage: ERROR_MESSAGE.UPDATE_QUANTITY_FAILED,
  });
}
