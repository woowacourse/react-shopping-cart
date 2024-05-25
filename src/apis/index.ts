import { CartItem, Coupon } from "@/types/cart";
import { generateBasicToken } from "@/utils/auth";

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface APIOptions {
  method: HttpMethod;
  exceptionText: string;
  headers?: HeadersInit;
  body?: object;
}

const cartAPIClient = async <T>(
  endPoint: string,
  apiOptions: APIOptions
): Promise<T> => {
  const { method, exceptionText, headers, body } = apiOptions;

  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}${endPoint}`, {
    method: method,
    headers: { Authorization: token, ...headers },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(exceptionText);
  }

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  return isJson ? response.json() : ({} as T);
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await cartAPIClient<{ content: CartItem[] }>("/cart-items", {
    method: "GET",
    exceptionText:
      "장바구니 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요.",
  });

  return response.content;
};

export const patchCartItemQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<void> => {
  await cartAPIClient<void>(`/cart-items/${cartItemId}`, {
    method: "PATCH",
    exceptionText: "상품 수량 변경에 실패했습니다. 나중에 다시 시도해 주세요.",
    headers: {
      "Content-Type": "application/json",
    },
    body: { quantity },
  });
};

export const removeCartItem = async (cartItemId: number): Promise<void> => {
  await cartAPIClient<void>(`/cart-items/${cartItemId}`, {
    method: "DELETE",
    exceptionText: "아이템을 삭제할 수 없습니다. 나중에 다시 시도해 주세요.",
  });
};

export const getCoupons = async (): Promise<Coupon[]> => {
  const response = await cartAPIClient<Coupon[]>("/coupons", {
    method: "GET",
    exceptionText:
      "쿠폰 데이터를 불러올 수 없습니다. 나중에 다시 시도해 주세요",
  });

  return response;
};

export const requestOrders = async (
  selectedCartItemIds: number[]
): Promise<void> => {
  console.log(selectedCartItemIds);
  await cartAPIClient<void>(`/orders`, {
    method: "POST",
    exceptionText:
      "결제 과정에서 문제가 발생했습니다. 나중에 다시 시도해 주세요",
    headers: {
      "Content-Type": "application/json",
    },
    body: { cartItemIds: selectedCartItemIds },
  });
};
