import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "./constants";

const productListUrl = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}`;
const productDetailUrl = (id) => `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}/${id}`;

export const fetchData = async (requestUrl) => {
  const response = await fetch(requestUrl);
  if (!response.ok) throw new Error("fetch error");

  const data = await response.json();
  if (!data) throw new Error("No Data");

  return data;
};

export const fetchProductList = () => fetchData(productListUrl);
export const fetchProductDetail = (id) => fetchData(productDetailUrl(id));
