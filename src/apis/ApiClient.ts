import HTTPError from '@errors/HTTPError';
import { generateBasicToken } from '@utils/auth';

export default class ApiClient {
  private static API_URL = process.env.VITE_API_URL as string;
  private static USER_ID = process.env.VITE_USER_ID as string;
  private static USER_PASSWORD = process.env.VITE_USER_PASSWORD as string;
  private static TOKEN = generateBasicToken(this.USER_ID, this.USER_PASSWORD);

  static validateResponse(response: Response, errorMessage: string) {
    if (!response.ok) {
      throw new HTTPError(response.status, errorMessage);
    }
  }

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
    const url = `${this.API_URL}/${endpoint}`;
    const options = {
      method,
      headers: {
        Authorization: this.TOKEN,
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);

    return response;
  }
}
