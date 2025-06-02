const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

interface ApiClientParams<P> {
  url: string;
  options?: RequestInit;
  params?: P;
}

const apiClient = async <T, P>({ url, options, params }: ApiClientParams<P>): Promise<T> => {
  const searchParams = params ? new URLSearchParams(params).toString() : "";
  try {
    const response = await fetch(`${BASE_URL}${url}?${searchParams}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${TOKEN}`,
      },
      ...options,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
    return options?.method === "GET" ? response.json() : (undefined as T);
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message || "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    return undefined as T;
  }
};

export default apiClient;
