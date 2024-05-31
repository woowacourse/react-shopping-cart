import { API_TOKEN } from "../utils/storage";

const BASE_URL = process.env.VITE_API_BASE_URL;

interface RequestProps {
  endpoint: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: object;
}

export const request = async ({ endpoint, method, headers = {}, body }: RequestProps) => {
  const url = `${BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: API_TOKEN,
      ...headers,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response) return;

  if (method === "GET") {
    return await response.json();
  }

  return response;
};

export const fetchProducts = async () => {
  return await request({ endpoint: "/cart-items", method: "GET" });
};

export const deleteProduct = async (cartId: number) => {
  return await request({ endpoint: `/cart-items/${cartId}`, method: "DELETE" });
};

interface ChangeProductAmountProps {
  quantity: number;
  id: number;
}

export const changeProductAmount = async ({ quantity, id }: ChangeProductAmountProps) => {
  return request({ endpoint: `/cart-items/${id}`, method: "PATCH", body: { quantity } });
};

export const fetchCartItemsCounts = async () => {
  const data: { quantity: number } = await request({ endpoint: "/cart-items/counts", method: "GET" });
  return data.quantity;
};

export const fetchCoupons = async () => {
  return await request({ endpoint: "/coupons", method: "GET" });
};

export const generateOrder = async (cartItemIds: number[]) => {
  const response: Response = await request({ endpoint: "/orders", method: "POST", body: { cartItemIds } });
  return response.status;
};
