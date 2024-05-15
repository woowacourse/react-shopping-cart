import { selector } from "recoil";
import { API_TOKEN } from "../utils";

type MethodType = "GET" | "POST";

const fetchProducts = async (method: MethodType) => {
  try {
    const token = API_TOKEN;
    const url = import.meta.env.VITE_API_BASE_URL + "/cart-items";
    const response = await fetch(url, {
      method,
      headers: { Authorization: token },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return error;
  }
};

export const cartState = selector({
  key: "cartState",
  get: async () => {
    const products = await fetchProducts("GET");
    return products.content;
  },
});
