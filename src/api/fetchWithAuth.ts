import { generateBasicToken } from "../utils/generateBasicToken";

const BASE_URL = import.meta.env.VITE_API_URL as string;
const USERNAME = import.meta.env.VITE_USERNAME as string;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD as string;

if (!BASE_URL || !USERNAME || !USER_PASSWORD) {
  throw new Error(
    "API_URL, USERNAME, PASSWORD environment variables are not set"
  );
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method: HttpMethod;
  body?: Record<string, unknown>;
}

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
