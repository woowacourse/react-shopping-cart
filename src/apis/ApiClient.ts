import { generateBasicToken } from '@utils/auth';

const API_URL = process.env.VITE_API_URL as string;
const USER_ID = process.env.VITE_USER_ID as string;
const USER_PASSWORD = process.env.VITE_USER_PASSWORD as string;

const token = generateBasicToken(USER_ID, USER_PASSWORD);

export default class ApiClient {
  static get(endpoint: string, headers: Record<string, string> = {}) {
    return this.request('GET', endpoint, null, headers);
  }

  static post<T extends Record<string, unknown>>(endpoint: string, body: T, headers: Record<string, string> = {}) {
    return this.request<T>('POST', endpoint, body, headers);
  }

  static patch<T extends Record<string, unknown>>(endpoint: string, body: T, headers: Record<string, string> = {}) {
    return this.request<T>('PATCH', endpoint, body, headers);
  }

  static delete(endpoint: string, headers: Record<string, string> = {}) {
    return this.request('DELETE', endpoint, null, headers);
  }

  static async request<T>(
    method: 'GET' | 'DELETE' | 'PATCH' | 'POST',
    endpoint: string,
    body: T | null,
    headers: Record<string, string> = {},
  ): Promise<Response> {
    const url = `${API_URL}/${endpoint}`;
    const options = {
      method,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    return response;
  }
}
