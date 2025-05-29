import { CartItemType } from "../types/response";
import apiClient from "./apiClient";

export interface AddCartItemsProps {
  productId: number;
  quantity: number;
}

interface CartItemsResponse {
  content: CartItemType[];
}

export const getCartItems = async () => {
  const data = await apiClient<CartItemsResponse>({
    method: "GET",
    URI: `/cart-items`,
  });
  return data.content;
};

export const addCartItem = async (cartItem: AddCartItemsProps) => {
  await apiClient({ method: "POST", URI: "/cart-items", body: cartItem });
};

export const removeCartItem = async (id: number) => {
  await apiClient({ method: "DELETE", URI: `/cart-items/${id}` });
};

export const increaseCartItem = async (id: number, quantity: number) => {
  await apiClient({
    method: "PATCH",
    URI: `/cart-items/${id}`,
    body: { quantity },
  });
};

export const decreaseCartItem = async (id: number, quantity: number) => {
  await apiClient({
    method: "PATCH",
    URI: `/cart-items/${id}`,
    body: { quantity },
  });
};
