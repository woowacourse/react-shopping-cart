import { ApiError } from "@/constants/ApiError";
import { getErrorMessage } from "@/util/error/getErrorMessage";
import { getErrorTypeByStatus } from "@/util/error/getErrorTypeByStatus";
import { toApiError } from "@/util/error/toApiError";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export async function apiRequest(
  url: string | URL,
  options: RequestInit
): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorType = getErrorTypeByStatus(response.status);
      throw new ApiError(
        response.status,
        response.statusText,
        getErrorMessage(response.statusText, response.status),
        errorType
      );
    }

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw toApiError(error);
  }
}

export async function apiRequestJson<T>(
  url: string | URL,
  options: RequestInit = {}
): Promise<T> {
  const response = await apiRequest(url, options);
  return response.json();
}

export function createRequestOptions(
  method: string,
  options: Partial<RequestInit> = {}
): RequestInit {
  return {
    method,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
      ...options.headers,
    },
    ...options,
  };
}

export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string>,
  options?: Partial<RequestInit>
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  return apiRequestJson<T>(url, createRequestOptions("GET", options));
}

export async function apiPost<T>(
  endpoint: string,
  body?: unknown,
  options?: Partial<RequestInit>
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  return apiRequestJson<T>(
    url,
    createRequestOptions("POST", {
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })
  );
}

export async function apiPatch<T = void>(
  endpoint: string,
  body?: unknown,
  options?: Partial<RequestInit>
): Promise<T | void> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  const response = await apiRequest(
    url,
    createRequestOptions("PATCH", {
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    })
  );

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
}

export async function apiDelete(
  endpoint: string,
  options?: Partial<RequestInit>
): Promise<void> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  await apiRequest(url, createRequestOptions("DELETE", options));
}
