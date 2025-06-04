import { CartItemContent } from "../../types/response";
import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "징바구니를 가져오는 데 실패했습니다.";

export const getCartItems = async (): Promise<CartItemContent[]> => {
  const params = new URLSearchParams({
    page: "0",
    size: "50",
    sort: "asc",
  });

  const response = await httpClient.get(`/cart-items?${params.toString()}`);
  if (!response.ok) throw new Error(ERROR_MESSAGE);

  const data = await response.json();
  return data.content;
};
