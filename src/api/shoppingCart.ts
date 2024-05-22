import { BASE_URL, USER_ID, USER_PASSWORD } from '.';
import { generateBasicToken } from './auth';

import { CartItemType } from '../type';
import MESSAGE from '../constants/Message';

interface fetchProps {
  uri: string;
  method: string;
  payload?: object;
  errorMessage: string;
}

const getAuthHeadersWithPayload = () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  return {
    Authorization: token,
    'Content-Type': 'application/json',
  };
};

const getAuthHeadersWithoutPayload = () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  return {
    Authorization: token,
  };
};

const fetchWithPayload = async ({
  uri,
  method,
  payload,
  errorMessage,
}: fetchProps) => {
  const response = await fetch(uri, {
    method: method,
    headers: getAuthHeadersWithPayload(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response;
};

const fetchWithoutPayload = async ({
  uri,
  method,
  errorMessage,
}: fetchProps) => {
  const response = await fetch(uri, {
    method: method,
    headers: getAuthHeadersWithoutPayload(),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response;
};

export const fetchGetCartItems = async (): Promise<CartItemType[]> => {
  const response = await fetchWithoutPayload({
    uri: `${BASE_URL}/cart-items`,
    method: 'GET',
    errorMessage: MESSAGE.fetchError,
  });

  const data = await response.json();
  return data.content;
};

export const fetchRemoveCartItem = async (
  cartItemId: number,
): Promise<void> => {
  await fetchWithoutPayload({
    uri: `${BASE_URL}/cart-items/${cartItemId}`,
    method: 'DELETE',
    errorMessage: MESSAGE.removalError,
  });
};

export const fetchAdjustCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<void> => {
  await fetchWithPayload({
    uri: `${BASE_URL}/cart-items/${cartItemId}`,
    method: 'PATCH',
    payload: { quantity },
    errorMessage: MESSAGE.quantityAdjustmentError,
  });
};
