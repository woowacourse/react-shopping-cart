class HTTPClient {
  baseUrl = '';
  apiKey = '';

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private headers(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      Authorization: this.apiKey
    };
  }

  async get(url: string) {
    const response = await fetch(this.baseUrl + url, {
      headers: this.headers()
    });

    return response;
  }

  async post<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(data)
    });

    return response;
  }

  async delete(url: string) {
    const response = await fetch(this.baseUrl + url, {
      method: 'DELETE',
      headers: this.headers()
    });

    return response;
  }

  async patch<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: 'PATCH',
      headers: this.headers(),
      body: JSON.stringify(data)
    });

    return response;
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = `Basic ${btoa(`${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`)}`;

export const httpClient = new HTTPClient(BASE_URL, API_KEY);
