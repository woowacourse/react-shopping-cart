import { API_SERVER } from "./constants";

const { BASE_URL, PATH } = API_SERVER;

const productListUrl = `${BASE_URL}${PATH.PRODUCT_LIST}`;
const productDetailUrl = (id) => `${BASE_URL}${PATH.PRODUCT_LIST}/${id}`;
const cartUrl = `${BASE_URL}${PATH.CART}`;

const REQUEST_METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

const fetchData = async (method, requestUrl = "", requestData = {}) => {
  const fetchInitOption = { method };
  if (method !== REQUEST_METHOD.GET) {
    fetchInitOption.body = JSON.stringify(requestData);
  }

  const response = await fetch(requestUrl, fetchInitOption);
  if (!response.ok) throw new Error("fetch error");

  const data = await response.json();
  if (!data) throw new Error("No Data");

  return data;
};

export const requestGetProductList = () =>
  fetchData(REQUEST_METHOD.GET, productListUrl);
export const requestGetProductDetail = (id) =>
  fetchData(REQUEST_METHOD.GET, productDetailUrl(id));
export const requestGetCartItemList = () =>
  fetchData(REQUEST_METHOD.GET, cartUrl);

export const requestPostCartItem = (productList) =>
  fetchData(REQUEST_METHOD.POST, cartUrl, { productList });

export const requestDeleteCartItem = (productIdList) =>
  fetchData(REQUEST_METHOD.DELETE, cartUrl, { productIdList });
