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
    let errorMessage = '알 수 없는 에러가 발생했습니다.';
    try {
      const json = await result.clone().json();
      errorMessage = json.message ?? errorMessage;
    } catch {
      const text = await result.text();
      errorMessage = text || errorMessage;
    }

    throw new Error(errorMessage);
  }

  const contentType = result.headers.get('Content-Type');
  if (contentType?.includes('application/json')) {
    return result.json();
  }

  return null;
}
