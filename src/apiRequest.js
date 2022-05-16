import { BASE_SERVER_URL, PRODUCT_LIST_PATH } from "./constants";

const productListURL = `${BASE_SERVER_URL}${PRODUCT_LIST_PATH}`;

export const fetchData = async (requestUrl) => {
  const response = await fetch(requestUrl);
  if (!response.ok) throw new Error("fetch error");

  const data = await response.json();
  if (!data) throw new Error("No Data");

  return data;
};

export const fetchProductList = () => fetchData(productListURL);
