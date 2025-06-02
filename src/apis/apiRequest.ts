interface ApiRequestProps {
  url: string;
  method: string;
  body?: string;
  headers?: Record<string, string>;
}

export const apiRequest = async ({ url, method, body }: ApiRequestProps) => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!response.ok) {
    throw new Error();
  }

  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  }

  return response;
};
