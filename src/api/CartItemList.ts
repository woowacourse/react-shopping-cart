import { HttpMethod } from "../types/HttpMethod";
import { FetchCartItemListResult } from "../types/FetchCartItemListResult";
import { BASE_URL, TOKEN } from "./config";

type cartItemsParams = {
  method: HttpMethod;
  params?: {
    page: string;
    size: string;
  };
};

const cartItems = async ({
  method,
  params = { page: "0", size: "50" },
}: cartItemsParams): Promise<FetchCartItemListResult> => {
  const url = new URL(`${BASE_URL}/cart-items`);

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

export default cartItems;
