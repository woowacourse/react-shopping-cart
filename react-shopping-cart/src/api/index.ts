import { CartItem } from "type";
import { API_URL } from "../constants";

export const fetchProducts = async (id: number) => {
  const res = await fetch(`${API_URL}/products?_page=${id}&_limit=12`);
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  return await res.json();
};

export const fetchDetailProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("로드에 실패했습니다!");
  }
  return await res.json();
};

export const fetchCarts = async (): Promise<CartItem[]> => {
  const res = await fetch(`${API_URL}/carts`);
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }

  const data: CartItem[] = await res.json();
  return data;
};

export const addProductToCart = async (
  product: CartItem
): Promise<CartItem> => {
  const res = await fetch(`${API_URL}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("등록에 실패했습니다");
  }

  const data: CartItem = await res.json();
  return data;
};

export const deleteProductFromCart = async (id: string) => {
  const res = await fetch(`${API_URL}/carts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("삭제에 실패했습니다");
  }
  return await res.json();
};

export const fetchOrderItems = async (): Promise<CartItem[]> => {
  const res = await fetch(`${API_URL}/orders`);
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  const data: CartItem[] = await res.json();
  return data;
};

export const addOrderItem = async (product: CartItem): Promise<CartItem> => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("주문에 실패했습니다");
  }
  return await res.json();
};

export const deleteOrderItem = async (id: string) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("삭제에 실패했습니다");
  }
  return await res.json();
};
