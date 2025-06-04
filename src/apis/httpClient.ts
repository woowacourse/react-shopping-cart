import { API_BASE_URL } from "./config";

export const API_KEY = import.meta.env.VITE_API_KEY;

class HTTPClient {
  baseUrl = "";
  apiKey = "";

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey || "";
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: `Basic ${this.apiKey}` }),
    };
  }

  async get(url: string) {
    const response = await fetch(this.baseUrl + url, {
      headers: this.getHeaders(),
    });

    return response;
  }

  async post<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return response;
  }

  async patch<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return response;
  }

  async delete(url: string) {
    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    return response;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export const httpClient = new HTTPClient(API_BASE_URL, API_KEY);
