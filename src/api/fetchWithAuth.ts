import { BASE_URL, USERNAME, USER_PASSWORD } from "../config";
import { generateBasicToken } from "../utils/generateBasicToken";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  body?: Record<string, unknown>;
}

export const PATH = {
  cartItems: "/cart-items",
  coupons: "/coupons",
  orders: "/orders",
};

export const fetchWithAuth = async (path: string, options: RequestOptions) => {
  const requestInit = requestBuilder(options);

  const response = await fetch(`${BASE_URL}${path}`, requestInit);

  if (!response.ok) {
    throw new Error(`Failed to ${options.method} ${path}`);
  }

  return response;
};

const requestBuilder = (options: RequestOptions): RequestInit => {
  const token = generateBasicToken(USERNAME, USER_PASSWORD);

  const { method, body } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};
