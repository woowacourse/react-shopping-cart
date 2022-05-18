import { GET, POST, PATCH, DELETE } from 'constants/index';
import { ProductData } from 'types';

type Method = typeof GET | typeof POST | typeof PATCH | typeof DELETE;

type Body = {
  [key: string]: any;
};

const OPTIONS = (method: Method, body?: Body) => {
  switch (method) {
    case GET:
    case DELETE:
      return {
        method,
        headers: { 'Content-type': 'application/json' },
      };
    case POST:
    case PATCH:
      return {
        method,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(body),
      };
    default:
      throw Error('존재하지 않은 method입니다.');
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
