import { generateBasicToken } from '../utils/auth';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

type Body = ReadableStream | XMLHttpRequestBodyInit;
type HeadersType = [string, string][] | Record<string, string> | Headers;

const USER_ID = process.env.VITE_API_USER_ID || 'id';
const USER_PASSWORD = process.env.VITE_API_USER_PASSWORD || 'password';

type RequestProps = {
  baseUrl: string;
  endpoint: string;
  headers?: HeadersType;
  body?: Body | object | null;
};

type FetcherProps = RequestProps & {
  method: Method;
  baseUrl: string;
  endpoint: string;
};

type Options = {
  method: Method;
  headers: HeadersType;
  body?: Body | null;
};

export const requestGet = async <T>({ baseUrl, endpoint, headers = {} }: RequestProps): Promise<T> => {
  const response = await fetcher({ method: 'GET', baseUrl, endpoint, headers });
  const data: T = await response.json();

  return data;
};

export const requestPatch = ({ baseUrl, endpoint, headers = {}, body }: RequestProps) => {
  return fetcher({ method: 'PATCH', baseUrl, endpoint, headers, body });
};

export const requestPost = ({ baseUrl, endpoint, headers = {}, body }: RequestProps) => {
  return fetcher({ method: 'POST', baseUrl, endpoint, headers, body });
};

export const requestDelete = ({ baseUrl, endpoint, headers = {} }: RequestProps) => {
  return fetcher({ method: 'DELETE', baseUrl, endpoint, headers });
};

// 실제 오류를 감지하고 처리하고, fetch툴을 이용해 fetch해오는 곳
const fetcher = ({ method, baseUrl, endpoint, headers, body }: FetcherProps) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  };

  const url = `${baseUrl}${endpoint}`;

  return errorHandler(url, options, endpoint);
};

const errorHandler = async (url: string, options: Options, endpoint: string) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error('오류가 발생했습니다.');

    return response;
  } catch (error) {
    console.error(`fail to fetch ${endpoint}\n error message: ${error}`);
    throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
  }
};
