import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "장바구니에 상품을 제거하던 중 에러가 발생했습니다.";

export const deleteCartItem = async (id: number) => {
  try {
    await httpClient.delete(`/cart-items/${id}`);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};
