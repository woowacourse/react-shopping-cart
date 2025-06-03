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

const tryFetchData = (fetchFunction: Promise<Response>, parseJson: boolean) => {
  return fetchFunction
    .then((response) => {
      if (!response.ok)
        throw new Error(`잘못된 접근입니다: ${response.status}`);
      if (!parseJson) return response;
      return response.json();
    })
    .then((data) => data.content || data)
    .catch((error) => {
      throw new Error("API 통신중 오류가 발생했습니다 : " + error.message);
    });
};

export const apiClient = {
  delete: (url: string, id: string) =>
    tryFetchData(
      fetch(`${baseUrl}/${url}/${id}`, getRequestHeaders("DELETE")),
      false
    ),
  get: (url: string, params?: URLSearchParams) => {
    const queryParams = params ? `?${params.toString()}` : "";
    return tryFetchData(
      fetch(`${baseUrl}/${url}${queryParams}`, getRequestHeaders("GET")),
      true
    );
  },
  patch: (url: string, id: number, body?: object) => {
    return tryFetchData(
      fetch(`${baseUrl}/${url}/${id}`, getRequestHeaders("PATCH", body)),
      false
    );
  },
};
