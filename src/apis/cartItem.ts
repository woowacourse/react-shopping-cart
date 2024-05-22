import { CartItem } from "@/types/cartItem";
import fetchWithAuth from "./utils/fetchWithAuth";

/**
 * 사용자의 장바구니 목록 조회
 */
export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetchWithAuth("/cart-items", {
    method: "GET",
  });

  const data = await response.json();
  return data.content;
};

/**
 * 장바구니 아이템 삭제
 */
export const deleteCartItem = async (id: number): Promise<void> => {
  await fetchWithAuth(`/cart-items/${id}`, {
    method: "DELETE",
  });
};

/**
 * 장바구니 아이템 수량 변경
 */
export const patchCartItemQuantity = async (
  id: number,
  quantity: number
): Promise<void> => {
  await fetchWithAuth(`/cart-items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
};

/**
 * 장바구니 아이템 수량 조회
 */
export const getCartItemQuantity = async (): Promise<number> => {
  const response = await fetchWithAuth("/cart-items/counts", {
    method: "GET",
  });

  const data = await response.json();
  return data.quantity;
};
