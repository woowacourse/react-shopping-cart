type CustomRequestInit = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export default class Api {
  #baseUrl: string;
  #defaultOptions: RequestInit;

  constructor(baseUrl: string, defaultOptions?: RequestInit) {
    this.#baseUrl = baseUrl;
    this.#defaultOptions = defaultOptions || {};
  }

  async get(path: string, options?: RequestInit) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "GET",
      ...this.#defaultOptions,
      ...options,
    });

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async post(path: string, options?: CustomRequestInit) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "POST",
      ...this.#defaultOptions,
      ...options,
      body: JSON.stringify(options?.body),
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  async put(path: string, options?: CustomRequestInit) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "PUT",
      ...this.#defaultOptions,
      ...options,
      body: JSON.stringify(options?.body),
    });

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  async patch(path: string, options?: CustomRequestInit) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "PATCH",
      ...this.#defaultOptions,
      ...options,
      body: JSON.stringify(options?.body),
    });

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  async delete(path: string, options?: CustomRequestInit) {
    const response = await fetch(`${this.#baseUrl}${path}`, {
      method: "DELETE",
      ...this.#defaultOptions,
      ...options,
      body: JSON.stringify(options?.body),
    });

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }
}
