import { ERROR_MESSAGE } from './errorMessage';

export interface fetchDataParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: object;
  token?: string;
  defaultErrorMessage?: string;
}

export default async function fetchData({
  url,
  method,
  body,
  token,
  defaultErrorMessage,
}: fetchDataParams) {
  const headers = getHeaders(token);
  const requestData: RequestInit = { method, headers };

  if (body) {
    requestData.body = JSON.stringify(body);
  }

  const response = await getFetchResult(url, requestData);
  if (!response.ok) {
    throw new Error(getResponseErrorMessage(response.status, defaultErrorMessage));
  }

  return response;
}

function getHeaders(token?: string): Record<string, string> {
  const headers = { 'Content-type': 'application/json' };
  if (token) {
    return { ...headers, Authorization: token };
  }
  return headers;
}

async function getFetchResult(url: string, requestData: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, requestData);
    return response;
  } catch (error) {
    throw new Error(getNetworkErrorMessage(error));
  }
}

function getNetworkErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return ERROR_MESSAGE.NETWORK_DISCONNECTED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}

function getResponseErrorMessage(status: number, defaultErrorMessage?: string): string {
  if (status >= 500) {
    return ERROR_MESSAGE.SERVER_ERROR;
  }
  if (status === 401 || status === 403) {
    return ERROR_MESSAGE.AUTHENTICATION_FAILED;
  }
  if (status >= 400) {
    return defaultErrorMessage ?? ERROR_MESSAGE.FETCHING_FAILED;
  }
  return ERROR_MESSAGE.UNKNOWN_ERROR;
}
