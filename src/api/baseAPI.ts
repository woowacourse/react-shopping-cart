export async function baseAPI<T>({
  method,
  path,
  body,
}: {
  method: string;
  path: string;
  body?: Record<string, unknown>;
}): Promise<T | null> {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const result = await fetch(`${baseURL}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${btoa(
        `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
      )}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (method === 'GET' && !result.ok) {
    throw new Error('GET 요청에 실패하였습니다.');
  }

  if (method === 'GET') return result.json();
  return null;
}
