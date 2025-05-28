import { httpClient } from "../httpClient";

interface Props {
  productId: number;
  quantity: number;
}

const ERROR_MESSAGE =
  "장바구니에서 상품의 수량을 조절하던 중 에러가 발생했습니다.";

export const updateCartItems = async ({ productId, quantity }: Props) => {
  const response = await httpClient.patch(`/cart-items/${productId}`, {
    quantity,
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
};
