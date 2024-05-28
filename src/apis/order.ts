import { API_URL } from "@/apis/url";
import { basicToken } from "@/auth";
import { ErrorMessage } from "@/constants/error.ts";

export async function postOrder(cartItemIds: number[]) {
  const response = await fetch(`${API_URL.orders}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: basicToken },
    body: JSON.stringify({ cartItemIds: cartItemIds }),
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failPostOrder);
  }
}
