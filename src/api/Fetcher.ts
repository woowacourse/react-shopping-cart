import { ERROR_MESSAGE } from '@/constants/messages';
import HttpError from '@/error/HttpError';

type FetchOption = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body: BodyInit | null;
  headers: HeadersInit;
};

const Fetcher = {
  sendRequest: async <T>(
    url: string,
    { method = 'GET', body = null, headers = {} }: Partial<FetchOption>,
  ): Promise<T> => {
    try {
      const res = await fetch(url, {
        method: method,
        body,
        headers: headers,
      });

      if (!res.ok) {
        const error = new HttpError(ERROR_MESSAGE.FAIL_FETCH, res.status);
        throw error;
      }

      const text = await res.text();
      if (!text) {
        return {} as T;
      }

      const data: T = JSON.parse(text);
      return data;
    } catch (err) {
      throw err;
    }
  },
};

export default Fetcher;
