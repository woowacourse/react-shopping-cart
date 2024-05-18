import { CartItem } from "@/types/cart";
import { API_URL, basicToken } from ".";

export async function getCartItems(): Promise<CartItem[]> {
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: basicToken },
  });

  if (!response.ok) {
    throw new Error(
      "장바구니 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요."
    );
  }

  const data = await response.json();

  return data.content;
}

export async function patchCartItemQuantity(
  cartItemId: number,
  quantity: number
): Promise<boolean> {
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      Authorization: basicToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("상품 수량 변경에 실패했습니다. 나중에 다시 시도해 주세요");
  }

  return response.ok;
}

export async function removeCartItem(cartItemId: number): Promise<boolean> {
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: basicToken,
    },
  });

  if (!response.ok) {
    throw new Error("아이템을 삭제할 수 없습니다. 나중에 다시 시도해 주세요.");
  }

  return response.ok;
}
