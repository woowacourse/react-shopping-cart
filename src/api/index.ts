import { CART_API_URL, LOCAL_STORAGE_KEYWORD, PRODUCT_API_URL } from '@Constants/index';

import { isHttpStatusError } from '@Utils/isHttpStatusError';
import { localData } from '@Utils/localData';

export const getFetchProductList = async <T>() => {
  try {
    const response = await fetch(PRODUCT_API_URL);
    isHttpStatusError(response.status);
    const resultData = (await response.json()) as T;
    return resultData;
  } catch {
    alert('현재 문제가 발생하였습니다. 잠시후 다시 시도해주세요');
    return [];
  }
};

export const getFetchCartList = async <T>() => {
  try {
    const userData = localData.getData(LOCAL_STORAGE_KEYWORD.SHOPPING_CART);
    if (userData) return userData;

    const response = await fetch(CART_API_URL);
    isHttpStatusError(response.status);
    const resultData = (await response.json()) as T;
    return resultData;
  } catch {
    alert('현재 문제가 발생하였습니다. 잠시후 다시 시도해주세요');
    return [];
  }
};

type PostOrDeleteData = { id: number };
type PutData = { id: number; quantity: number };

export const postFetchCartItem = async (data: PostOrDeleteData) => {
  try {
    const response = await fetch(CART_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    isHttpStatusError(response.status);
  } catch {
    alert('현재 문제가 발생하였습니다. 잠시후 다시 시도해주세요');
  }
};

export const putFetchCartItem = async (data: PutData) => {
  try {
    const response = await fetch(`${CART_API_URL}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: data.quantity }),
    });
    isHttpStatusError(response.status);
  } catch {
    alert('현재 문제가 발생하였습니다. 잠시후 다시 시도해주세요');
  }
};

export const deleteFetchCartItem = async (data: PostOrDeleteData) => {
  try {
    const response = await fetch(CART_API_URL, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    isHttpStatusError(response.status);
  } catch {
    alert('현재 문제가 발생하였습니다. 잠시후 다시 시도해주세요');
  }
};
