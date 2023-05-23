import { CART_API_URL, PRODUCT_API_URL } from '@Constants/index';

import { isHttpStatusError } from '@Utils/isHttpStatusError';

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
type PutData = { quantity: number };

export const postFetchCartItem = async <T>(data: PostOrDeleteData) => {
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

export const putFetchCartItem = async <T>(data: PutData) => {
  try {
    const response = await fetch(CART_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    isHttpStatusError(response.status);
  } catch {
    alert('현재 문제가 발생하였습니다. 잠시후 다시 시도해주세요');
  }
};

export const deleteFetchCartItem = async <T>(data: PostOrDeleteData) => {
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
