import { CartItemContent } from "../../types/response";
import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "징바구니를 가져오는 데 실패했습니다.";

export const getCartItems = async (): Promise<CartItemContent[]> => {
  try {
    const url = new URLSearchParams({
      page: "0",
      size: "50",
      sort: "asc",
    });

    const data = await httpClient.get(`/cart-items?${url.toString()}`);
    return data.content;
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};
