import { apiClient } from "./apiClient";

export const getCart = async () => {
  const data = await apiClient({
    method: "GET",
    URI: "/cart-items",
  });

  return data.content;
};
