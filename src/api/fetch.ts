import { getHeadersWithPayload, getHeadersWithoutPayload } from './headers';

interface FetchProps {
  url: string;
  method: string;
  payload?: object;
  errorMessage: string;
}

export const fetchWithPayload = async ({
  url,
  method,
  payload,
  errorMessage,
}: FetchProps) => {
  const response = await fetch(url, {
    method: method,
    headers: getHeadersWithPayload(),
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response;
};

export const fetchWithoutPayload = async ({
  url,
  method,
  errorMessage,
}: FetchProps) => {
  const response = await fetch(url, {
    method: method,
    headers: getHeadersWithoutPayload(),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response;
};
