import { CartItem } from "../types/types";
import apiClient from "./apiClient";

export const fetchCartItems = async (): Promise<CartItem[]> => {
  return await apiClient.get("/cart-items").then((data) => data.content);
};

export const addCartItem = async (productId: number) => {
  await apiClient.post("/cart-items", { productId });
};

export const deleteCartItem = async (addToCartId: number) => {
  await apiClient.delete(`/cart-items/${addToCartId}`);
};

export const patchCartItemQuantity = async (addToCartId: number, quantity: number) => {
  await apiClient.patch(`/cart-items/${addToCartId}`, { quantity });
};

export const fetchCartItemsCounts = async (): Promise<number> => {
  return await apiClient.get("/cart-items/counts").then((data) => data.quantity);
};
