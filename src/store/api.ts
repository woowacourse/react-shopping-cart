import { API_TOKEN } from "./utils";

type MethodType = "GET" | "POST";

export const fetchProducts = async (method: MethodType) => {
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

export const deleteProduct = async (cartId: number) => {
  await fetch(import.meta.env.VITE_API_BASE_URL + `/cart-items/${cartId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  });
};

interface ChangeProductAmountProps {
  quantity: number;
  cartId: number;
  type: "plus" | "minus";
}

export const changeProductAmount = async ({ quantity, cartId, type }: ChangeProductAmountProps) => {
  await fetch(import.meta.env.VITE_API_BASE_URL + `/cart-items/${cartId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    body: JSON.stringify({
      quantity: type === "plus" ? quantity + 1 : quantity - 1,
    }),
  });
};
