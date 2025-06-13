const token = import.meta.env.VITE_APP_TOKEN;
const baseUrl = import.meta.env.VITE_BASE_URL;

const getRequestHeaders = (method: string, body?: object) => {
  return {
    method,
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };
};

export const apiClient = {
  delete: (url: string, id: string) =>
    fetch(`${baseUrl}/${url}/${id}`, getRequestHeaders("DELETE")),

  get: (url: string, params?: URLSearchParams) => {
    const queryParams = params ? `?${params.toString()}` : "";
    return fetch(`${baseUrl}/${url}${queryParams}`, getRequestHeaders("GET"));
  },
  patch: (url: string, id: string, body?: object) =>
    fetch(`${baseUrl}/${url}/${id}`, getRequestHeaders("PATCH", body)),
};
