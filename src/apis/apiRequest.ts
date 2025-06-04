interface ApiRequestProps {
  url: string;
  method: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export const apiRequest = async ({ url, method, body }: ApiRequestProps) => {
  if (body !== undefined) {
    try {
      JSON.stringify(body);
    } catch (error) {
      throw new Error('body를 JSON.stringify 할 수 없습니다');
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  try {
    if (response.headers.get('Content-Type') === 'application/json') {
      return await response.json();
    }
  } catch (error) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response;
};
