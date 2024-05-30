import { getHeadersWithPayload, getHeadersWithoutPayload } from './headers';

interface FetchWithPayloadProps {
  url: string;
  method: string;
  payload: object;
  errorMessage: string;
}

interface FetchWithoutPayloadProps {
  url: string;
  method: string;
  errorMessage: string;
}

export const fetchWithPayload = async ({
  url,
  method,
  payload,
  errorMessage,
}: FetchWithPayloadProps) => {
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
}: FetchWithoutPayloadProps) => {
  const response = await fetch(url, {
    method: method,
    headers: getHeadersWithoutPayload(),
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response;
};
