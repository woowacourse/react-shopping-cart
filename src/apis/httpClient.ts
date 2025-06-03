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

  private async handleHttpError(response: Response) {
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errText}`
      );
    }
    return response;
  }

  async get(url: string) {
    const response = await fetch(this.baseUrl + url, {
      headers: this.getHeaders(),
    });
    await this.handleHttpError(response);

    return response.json();
  }

  async post<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    await this.handleHttpError(response);

    return response.json();
  }

  async patch<T>(url: string, data: T) {
    const response = await fetch(this.baseUrl + url, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    await this.handleHttpError(response);

    return response.json();
  }

  async delete(url: string) {
    const response = await fetch(this.baseUrl + url, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    await this.handleHttpError(response);

    const text = await response.text();

    return text ? JSON.parse(text) : null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export const httpClient = new HTTPClient(API_BASE_URL, API_KEY);
