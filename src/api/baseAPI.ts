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
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!result.ok) {
    throw new Error("요청에 실패하였습니다.");
  }

  if (result.status === 204) return null;

  const text = await result.text();
  if (text === "") return null;

  return JSON.parse(text) as T;
}
