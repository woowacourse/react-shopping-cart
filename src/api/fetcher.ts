import {
  API_URL_ERROR_MESSAGE,
  API_ERROR_MESSAGES,
} from "./constants/errorMessages";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method?: HttpMethod;
  params?: Record<string, string | number>;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export async function fetcher<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const API_URL = import.meta.env.VITE_BASE_URL || "";
  const TOKEN = import.meta.env.VITE_USER_TOKEN || "";

  if (!API_URL) {
    throw new Error(API_URL_ERROR_MESSAGE);
  }

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Basic ${TOKEN}`,
    ...options.headers,
  };

  let fullUrl = `${API_URL}${endpoint}`;

  if (options.params) {
    const urlParams = new URLSearchParams();

    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        urlParams.append(key, value.toString());
      }
    });

    const paramString = urlParams.toString();
    if (paramString) {
      fullUrl = `${fullUrl}?${paramString}`;
    }
  }

  const requestOptions = {
    method: options.method || "GET",
    headers: requestHeaders,
    ...(options.body && { body: JSON.stringify(options.body) }),
  };

  const response = await fetch(fullUrl, requestOptions);

  if (!response.ok) {
    throw new Error(
      API_ERROR_MESSAGES[response.status] || `API 요청 오류: ${response.status}`
    );
  }

  if (options.method === "DELETE") {
    return {} as T;
  }

  const responseText = await response.text();

  if (!responseText) {
    return {} as T;
  }
  const data = JSON.parse(responseText);
  return data.content !== undefined ? data.content : data;
}
