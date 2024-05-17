import { API_TOKEN } from "./utils";

type MethodType = "GET" | "POST";

export const fetchProducts = async (method: MethodType) => {
  try {
    const token = API_TOKEN;
    const url = process.env.VITE_API_BASE_URL + "/cart-items";
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
  await fetch(process.env.VITE_API_BASE_URL + `/cart-items/${cartId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  });
};

interface ChangeProductAmountProps {
  quantity: number;
  id: number;
  type: "plus" | "minus";
}

export const changeProductAmount = async ({ quantity, id, type }: ChangeProductAmountProps) => {
  await fetch(process.env.VITE_API_BASE_URL + `/cart-items/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
    body: JSON.stringify({
      quantity: type === "plus" ? quantity + 1 : quantity - 1,
    }),
  });
};

export const fetchCartItemsCounts = async () => {
  const response = await fetch(process.env.VITE_API_BASE_URL + "/cart-items/counts", {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: API_TOKEN },
  });
  const data = await response.json();
  return data.quantity;
};
