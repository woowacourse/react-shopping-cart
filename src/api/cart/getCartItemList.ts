import { FetchCartItemListResult } from "../../types/FetchCartItemListResult";
import { BASE_URL, TOKEN } from "../config";
import { GetCartItemListParams } from "./type";

const getCartItemList = async (
  params: GetCartItemListParams = { page: "0", size: "50" }
): Promise<FetchCartItemListResult> => {
  const url = new URL(`${BASE_URL}/cart-items`);
  url.search = new URLSearchParams(params).toString();

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default getCartItemList;
