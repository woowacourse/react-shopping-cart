import { BASE_SERVER_URL, SERVER_PATH } from "constants";

const fetchServer =
  ({ method, path, headers }) =>
  (params) =>
  async (body) => {
    const url = params
      ? `${BASE_SERVER_URL}${path}/${params}`
      : `${BASE_SERVER_URL}${path}`;

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`저장된 정보가 없습니다. 다시 시도해 주세요 :(`);
    }
    return data;
  };

export const getBaseServerProductList = fetchServer({
  method: "GET",
  path: SERVER_PATH.PRODUCT_LIST,
  headers: {
    "Content-Type": "application/json",
  },
})();
export const getBaseServerProductItem = fetchServer({
  method: "GET",
  path: SERVER_PATH.PRODUCT_LIST,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBaseServerCartList = fetchServer({
  method: "GET",
  path: SERVER_PATH.CART_LIST,
  headers: {
    "Content-Type": "application/json",
  },
});
export const postBaseServerCartItem = fetchServer({
  method: "POST",
  path: SERVER_PATH.CART_LIST,
  headers: {
    "Content-Type": "application/json",
  },
})();
export const deleteBaseServerCartItem = fetchServer({
  method: "DELETE",
  path: SERVER_PATH.CART_LIST,
  headers: {
    "Content-Type": "application/json",
  },
});
export const patchBaseServerCartItem = fetchServer({
  method: "PATCH",
  path: SERVER_PATH.CART_LIST,
  headers: {
    "Content-Type": "application/json",
  },
});
