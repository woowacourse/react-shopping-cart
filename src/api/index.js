import { GET, DELETE, POST, PATCH } from 'constants';

const OPTIONS = (method, body) => {
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

export const loadProductList = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/productList`, OPTIONS(GET));

    if (!response.ok) {
      throw Error('잘못된 API 조회입니다.');
    }

    return response.json();
  } catch (e) {
    throw e;
  }
};

export const loadProduct = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/productList/${id}`,
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
