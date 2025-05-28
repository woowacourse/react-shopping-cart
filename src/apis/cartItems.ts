import { CartItem } from "../types/type";
import { apiClient } from "./apiClient";

const cartItemsApi = {
  get: async (): Promise<CartItem[]> => {
    try {
      const params = {
        page: 0,
        size: 20,
      };

      const query = new URLSearchParams(params.toString()).toString();

      const response = await apiClient({
        endpoint: `/cart-items?${query}`,
        method: "GET",
      });

      return response;
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      throw error;
    }
  },

  patch: async (cartItemId: number, quantity: number) => {
    try {
      const response = await apiClient({
        endpoint: `/cart-items/${cartItemId}`,
        method: "PATCH",
        requestBody: { quantity },
      });

      return response;
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw error;
    }
  },

  delete: async (cartItemId: number) => {
    try {
      const response = await apiClient({
        endpoint: `/cart-items/${cartItemId}`,
        method: "DELETE",
      });

      return response;
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      throw error;
    }
  },
};

export default cartItemsApi;
