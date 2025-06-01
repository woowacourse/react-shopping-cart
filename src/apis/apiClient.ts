import { API_ERROR_MESSAGES, DEFAULT_ERROR_MESSAGE, NETWORK_ERROR_MESSAGE } from "./constants";

const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

interface ApiClientParams<P> {
  url: string;
  options?: RequestInit;
  params?: P;
}

const apiClient = async <T, P>({ url, options, params }: ApiClientParams<P>): Promise<T> => {
  const newParams = params && new URLSearchParams(params);
  try {
    const response = await fetch(`${BASE_URL}${url}?${newParams?.toString()}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${TOKEN}`,
      },
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || API_ERROR_MESSAGES[response.status] || DEFAULT_ERROR_MESSAGE);
    }
    return options?.method === "GET" ? response.json() : (undefined as T);
  } catch (e) {
    if (e instanceof TypeError && e.message.includes("fetch")) {
      throw new Error(NETWORK_ERROR_MESSAGE);
    }
    if (e instanceof Error) throw new Error(e.message || DEFAULT_ERROR_MESSAGE);
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }
};

export default apiClient;
