class HTTPClient {
  baseUrl = "";
  apiKey = "";

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || "";
  }

  async get(url: string) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      headers,
    });

    return response;
  }

  async post<T>(url: string, data: T) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return response;
  }

  async delete(url: string) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers,
    });

    return response;
  }

  async patch<T>(url: string, data: T) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: this.apiKey }),
    };

    const response = await fetch(this.baseUrl + url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    return response;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
export const httpClient = new HTTPClient(BASE_URL, API_KEY);
