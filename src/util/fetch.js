import { BASE_SERVER_URL, SERVER_PATH } from "constants";

const getServer = (hostUrl) => (path) => (id) => async () => {
  const url = id ? `${hostUrl}${path}/${id}` : `${hostUrl}${path}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`fetch error`);
  }

  const data = await response.json();
  if (!data) {
    throw new Error(`No Data`);
  }
  return data;
};

const postServer = (hostUrl) => (path) => async (body) => {
  const url = `${hostUrl}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`fetch error`);
  }

  const data = await response.json();
  if (!data) {
    throw new Error(`No Data`);
  }
  return data;
};

const deleteServer = (hostUrl) => (path) => (id) => async () => {
  const url = `${hostUrl}${path}/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`fetch error`);
  }

  const data = await response.json();
  if (!data) {
    throw new Error(`No Data`);
  }
  return data;
};

const patchServer =
  (hostUrl) =>
  (path) =>
  ({ type, id }) =>
  async () => {
    const url = `${hostUrl}${path}/${type}/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`fetch error`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`No Data`);
    }
    return data;
  };

const getBaseServer = getServer(BASE_SERVER_URL);
const postBaseServer = postServer(BASE_SERVER_URL);
const deleteBaseServer = deleteServer(BASE_SERVER_URL);
const patchBaseServer = patchServer(BASE_SERVER_URL);

export const getBaseServerProductList = getBaseServer(
  SERVER_PATH.PRODUCT_LIST
)();
export const getBaseServerProductItem = getBaseServer(SERVER_PATH.PRODUCT_LIST);

export const getBaseServerCartList = getBaseServer(SERVER_PATH.CART_LIST);
export const postBaseServerCartItem = postBaseServer(SERVER_PATH.CART_LIST);
export const deleteBaseServerCartItem = deleteBaseServer(SERVER_PATH.CART_LIST);
export const patchBaseServerCartItem = patchBaseServer(SERVER_PATH.CART_LIST);
