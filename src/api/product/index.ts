import { OPTIONS } from 'api';
import { GET } from 'constants/index';
import { ProductData } from 'types';

export const loadProduct = async (id: number): Promise<ProductData> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/productList/${id}`,
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

export const loadProductList = async (): Promise<ProductData[]> => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/productList`, OPTIONS(GET));

    if (!response.ok) {
      throw Error('잘못된 API 조회입니다.');
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};
