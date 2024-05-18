import { ERROR_MESSAGE } from '@/constants/error';
import { generateBasicToken } from '@/utils/auth';

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface Request {
  requestUrl: string;
  method: HTTPMethod;
  headers?: Record<string, string>;
  body?: Record<string, string | number>;
}

const fetchClient = {
  get({ requestUrl, headers }: Omit<Request, 'method' | 'body'>) {
    return this.request({ requestUrl, method: 'GET', headers });
  },
  post({ requestUrl, headers, body }: Omit<Request, 'method'>) {
    return this.request({ requestUrl, method: 'POST', headers, body });
  },
  patch({ requestUrl, headers, body }: Omit<Request, 'method'>) {
    return this.request({ requestUrl, method: 'PATCH', headers, body: body });
  },
  delete({ requestUrl, headers }: Omit<Request, 'method' | 'body'>) {
    return this.request({ requestUrl, method: 'DELETE', headers });
  },

  async request({ requestUrl, method, headers, body }: Request) {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);
    const response = await fetch(requestUrl, {
      method,
      headers: { Authorization: token, 'Content-Type': 'application/json', ...headers },
      body: body && JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE[method]);
    }

    return response;
  },
};

export default fetchClient;
