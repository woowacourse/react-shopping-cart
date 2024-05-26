import { CartItemId } from "../types/cartItems";
import { PATH, fetchWithAuth } from "./fetchWithAuth";

export const orders = async (cartItemIds: CartItemId[]) => {
  await fetchWithAuth(PATH.orders, { method: "POST", body: { cartItemIds } });
};
