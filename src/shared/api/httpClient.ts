const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const defaultHeaders = {
  Authorization: `Basic ${API_KEY}`,
  'Content-Type': 'application/json',
};

export const httpClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: defaultHeaders,
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  },

  post: async <T>(url: string, body?: unknown): Promise<T | void> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);

    // 현재 server에서 Response body가 비어있어서 아래 로직을 추가
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return;
  },

  delete: async (url: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: defaultHeaders,
    });
    if (!response.ok) throw new Error(response.statusText);
  },

  put: async <T>(url: string, body: unknown): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  },
  patch: async <T>(url: string, body: unknown): Promise<T | void> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);
    // 현재 server에서 Response body가 비어있어서 아래 로직을 추가
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      return response.json();
    }

    return;
  },
};
