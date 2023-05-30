import { Options } from "../type/api";

export default class HTTPClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getCombinedOptions(options: Options) {
    const fetchOptions = {
      ...options,
      headers: options.headers ?? {
        "Content-Type": "application/json",
      },
    };

    return fetchOptions;
  }

  private async request<T>(url: string, options: Options): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}${url}`,
      this.getCombinedOptions(options)
    );

    if (!response.ok) {
      throw Error(response.status.toString());
    }

    return await response.json();
  }

  get<T>(url: string, options: Options = {}) {
    return this.request<T>(url, { ...options, method: "GET" });
  }

  post<T>(url: string, options: Options = {}) {
    return this.request<T>(url, {
      ...options,
      method: "POST",
    });
  }

  patch<T>(url: string, options: Options = {}) {
    return this.request<T>(url, {
      ...options,
      method: "PATCH",
    });
  }

  delete<T>(url: string, options: Options = {}) {
    return this.request<T>(url, { ...options, method: "DELETE" });
  }
}

export const client = new HTTPClient("");
