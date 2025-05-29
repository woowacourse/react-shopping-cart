import { httpClient } from "../httpClient";
import { UpdateCartItemQuantity } from "./cartItem.type";

export const updateCartItemQuantity = async ({
  id,
  quantity,
}: UpdateCartItemQuantity) => {
  const response = await httpClient.patch(`/cart-items/${id}`, { quantity });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
};
