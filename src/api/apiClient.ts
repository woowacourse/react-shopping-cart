type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH';

interface ApiClientProps {
  endPoint: string;
  headers?: Record<string, string>;
  body?: string;
}

export const apiClient = {
  get: async ({endPoint, headers}: ApiClientProps) =>
    (await requestApi('GET', endPoint, headers)).json(),
  post: ({endPoint, headers, body}: ApiClientProps) =>
    requestApi('POST', endPoint, headers, body),
  delete: ({endPoint, headers}: ApiClientProps) =>
    requestApi('DELETE', endPoint, headers),
  patch: ({endPoint, headers, body}: ApiClientProps) =>
    requestApi('PATCH', endPoint, headers, body),
};

const requestApi = async (
  method: Method,
  endPoint: string,
  headers?: Record<string, string>,
  body?: string
) => {
  const token = import.meta.env.VITE_API_KEY;

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endPoint}`, {
    method: method,
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
};
