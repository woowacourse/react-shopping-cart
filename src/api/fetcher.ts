import { ENV } from './env';

type FetcherOptions<T> = {
  path: string;
  query?: object;
  body?: T;
};

type FetcherResponse<T> = Promise<T>;

export const fetcher = {
  get: async <T>({ path, query = {} }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      path,
      query,
      method: 'GET',
    });
  },
  post: async <T>({ path, body }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      path,
      body,
      method: 'POST',
      returnOriginalOnNoContent: true,
    });
  },
  patch: async <T>({ path, body }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      path,
      body,
      method: 'PATCH',
      returnOriginalOnNoContent: true,
    });
  },
  delete: async <T>({ path }: FetcherOptions<T>): FetcherResponse<T> => {
    return request<T>({
      path,
      method: 'DELETE',
      returnOriginalOnNoContent: true,
    });
  },
};

type RequestOptions<T> = {
  path: string;
  method: string;
  query?: object;
  body?: T;
  returnOriginalOnNoContent?: boolean;
};

const request = async <T>({
  path,
  method,
  query,
  body,
  returnOriginalOnNoContent,
}: RequestOptions<T>): Promise<T> => {
  const url = new URL(ENV.BASE_URL + path);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value)) {
      url.searchParams.append(key, String(value));
    }
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${ENV.TOKEN}`,
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && ['POST', 'PATCH'].includes(method)) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    // const errorData = await response.json().catch(() => null);
    // throw new HttpError(response.status, errorData);
    throw new Error();
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    if (returnOriginalOnNoContent && body) {
      return body as unknown as T;
    }
    return returnOriginalOnNoContent as unknown as T;
  }

  return await response.json();
};
