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

  if (!result.ok) {
    const resultData = await result.json();
    throw new Error(resultData.message);
  }

  const contentType = result.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await result.json();
  }
  return null;
}
