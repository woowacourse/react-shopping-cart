import { GET, PUT, POST } from 'constants/index';
import { OPTIONS } from 'api';
import { CartProductData } from 'types';

export const loadCartProduct = async (id: number): Promise<CartProductData | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/cartProductList/${id}`,
      OPTIONS(GET),
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const loadCartProductList = async (): Promise<CartProductData[]> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/cartProductList`,
      OPTIONS(GET),
    );

    if (!response.ok) {
      throw Error('잘못된 API 조회입니다.');
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const registerCartProduct = async (cartProduct: CartProductData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/cartProductList`,
      OPTIONS(POST, cartProduct),
    );

    if (!response.ok) {
      throw Error('잘못된 API 조회입니다.');
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const updateCartProduct = async (id: number, cartProduct: CartProductData) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/cartProductList/${id}`,
      OPTIONS(PUT, cartProduct),
    );

    if (!response.ok) {
      throw Error('잘못된 API 조회입니다.');
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};
