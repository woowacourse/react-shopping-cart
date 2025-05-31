import { httpClient } from "../httpClient";
import { UpdateCartItemQuantity } from "./cartItem.type";

export const updateCartItemQuantity = async ({
  id,
  quantity,
}: UpdateCartItemQuantity) => {
  const response = await httpClient.patch(`/cart-items/${id}`, { quantity });

  if (response.ok) {
    throw new Error("장바구니 아이템 수량 업데이트에 실패했습니다.");
  }
};
