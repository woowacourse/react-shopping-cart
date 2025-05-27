const getBaseUrl = () => {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return import.meta.env.VITE_MOCK_BASE_URL;
  }
  return import.meta.env.VITE_API_BASE_URL;
};

export const API_BASE_URL = getBaseUrl();
export const CLIENT_BASE_PATH =
  import.meta.env.BASE_URL || "/react-shopping-cart";
const API_KEY = import.meta.env.VITE_API_KEY;
export const END_POINT = "cart-items";

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
      ...(this.apiKey && { Authorization: this.apiKey }),
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

export const httpClient = new HTTPClient(CLIENT_BASE_PATH, API_KEY);
