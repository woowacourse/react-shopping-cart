export type ErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  path: string;
};

type FetchedData<T> = {
  data: T;
  headers: Headers;
};

const BASE_URL = ``;

const fetcher = async <T>(url: string, method: string, body?: unknown): Promise<FetchedData<T>> => {
  const options: RequestInit = {
    method: method,

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic bob:486`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${url}`, options);

  if (response.status >= 500) {
    throw new Error(`서버문제로 HTTP 통신에 실패했습니다. 상태 코드:${response.status}`);
  }

  if (!response.ok) {
    let errorResponse: ErrorResponse;

    try {
      errorResponse = await response.json();
    } catch (error) {
      errorResponse = {
        timestamp: new Date().toISOString(),
        status: 500,
        error: '에러 응답이 json 형식이 아닙니다.',
        path: url,
      };
    }

    throw errorResponse;
  }

  let data = null;
  const headers = response.headers;

  if (response.status === 204) {
    return { data: data as T, headers };
  }

  if (method === 'GET') {
    try {
      data = await response.json();
    } catch {
      const errorResponse: ErrorResponse = {
        timestamp: new Date().toISOString(),
        status: 500,
        error: '서버 응답 형식이 json 형식이 아닙니다.',
        path: url,
      };

      throw errorResponse;
    }
  }

  return { data: data as T, headers };
};

export const get = async <T>(url: string): Promise<FetchedData<T>> => {
  return await fetcher<T>(url, 'GET');
};

export const post = async <T>(url: string, body: unknown): Promise<FetchedData<T>> => {
  return await fetcher<T>(url, 'POST', body);
};

export const remove = async <T>(url: string): Promise<FetchedData<T>> => {
  return await fetcher<T>(url, 'DELETE');
};

export const patch = async <T>(url: string, body: unknown): Promise<FetchedData<T>> => {
  return await fetcher<T>(url, 'PATCH', body);
};
