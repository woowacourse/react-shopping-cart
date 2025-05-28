import.meta.env.VITE_BASE_URL;

import { HttpMethod } from "../types/HttpMethod";
import { FetchCartItemListResult } from "../types/FetchCartItemListResult";

type fetchCartItemsParams = {
  method: HttpMethod;
  params?: {
    page: string;
    size: string;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchCartItems = async ({
  method,
  params = { page: "0", size: "50" },
}: fetchCartItemsParams): Promise<FetchCartItemListResult> => {
  const url = new URL(BASE_URL);

  url.search = new URLSearchParams(params).toString();

  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchCartItems;
