interface ApiRequestProps {
  url: string;
  method: string;
  body?: string;
}

export const apiRequest = async ({ url, method, body }: ApiRequestProps) => {
  const response = await fetch(url, {
    method,
    body,
  });

  if (response.headers.get('Content-Type') === 'application/json') {
    return response.json();
  }

  return response;
};
