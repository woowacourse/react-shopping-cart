import {
  FETCH_ERROR_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
} from "../constants/errorMessages";

interface ApiClientProps<T = unknown> {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  URI: string;
  body?: T;
}

export const apiClient = async <T = unknown>({
  method,
  URI,
  body,
}: ApiClientProps<T>) => {
  const basicToken = btoa(
    `${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PASSWORD}`
  );
  // biome-ignore lint/style/useTemplate: --
  const requestURL = `${import.meta.env.VITE_API_BASE_URL}` + URI;
  const response = await fetch(requestURL, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-type": "application/json",
      Authorization: `Basic ${basicToken}`,
    },
  });

  if (response.status === 204 || response.status === 201) return;
  if (response.ok) {
    if (response.headers.get("content-length") === "0") return;
    return response.json();
  }

  if (response.status in FETCH_ERROR_MESSAGE) {
    throw new Error(FETCH_ERROR_MESSAGE[response.status]);
  }

  throw new Error(DEFAULT_ERROR_MESSAGE);
};
