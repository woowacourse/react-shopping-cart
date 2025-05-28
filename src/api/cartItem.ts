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

export const addCartItems = async (cartItem: AddCartItemsProps) => {
  await apiClient({ method: "POST", URI: "/cart-items", body: cartItem });
};

export const removeCartItems = async (id: number) => {
  await apiClient({ method: "DELETE", URI: `/cart-items/${id}` });
};

export const increaseCartItems = async (id: number, quantity: number) => {
  await apiClient({
    method: "PATCH",
    URI: `/cart-items/${id}`,
    body: { quantity },
  });
};

export const decreaseCartItems = async (id: number, quantity: number) => {
  await apiClient({
    method: "PATCH",
    URI: `/cart-items/${id}`,
    body: { quantity },
  });
};
