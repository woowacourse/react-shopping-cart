import { ApiError } from "../constants/ApiError";
import { getErrorMessage } from "../util/getErrorMessage";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";

type ApiClientGetType = {
  endpoint: string;
  searchParams: Record<string, string>;
  useToken?: boolean;
};

type ApiClientPostType = {
  endpoint: string;
  searchParams: Record<string, string | number>;
  useToken?: boolean;
};

type ApiClientDeleteType = {
  endpoint: string;
  useToken?: boolean;
};

type ApiClientPatchType = {
  endpoint: string;
  searchParams: Record<string, string | number>;
  useToken?: boolean;
};

class ApiClient {
  #baseUrl: string;
  #token: string;

  constructor(baseUrl: string, token: string) {
    this.#baseUrl = baseUrl;
    this.#token = token;
  }

  async get<T>({
    endpoint,
    searchParams,
    useToken = false,
  }: ApiClientGetType): Promise<T> {
    const url = new URL(`${this.#baseUrl}${endpoint}`);
    url.search = new URLSearchParams(searchParams).toString();

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...(useToken && { Authorization: `Basic ${this.#token}` }),
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorType = getErrorTypeByStatus(response.status);
      throw new ApiError(
        response.status,
        response.statusText,
        getErrorMessage(response.statusText, response.status),
        errorType
      );
    }

    return response.json();
  }

  async post({ endpoint, searchParams, useToken = true }: ApiClientPostType) {
    const url = new URL(`${this.#baseUrl}${endpoint}`);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(useToken && { Authorization: `Basic ${this.#token}` }),
      },
      body: JSON.stringify(searchParams),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorType = getErrorTypeByStatus(response.status);
      throw new ApiError(
        response.status,
        response.statusText,
        getErrorMessage(response.statusText, response.status),
        errorType
      );
    }
  }

  async delete({ endpoint, useToken = true }: ApiClientDeleteType) {
    const url = new URL(`${this.#baseUrl}${endpoint}`);

    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        ...(useToken && { Authorization: `Basic ${this.#token}` }),
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorType = getErrorTypeByStatus(response.status);
      throw new ApiError(
        response.status,
        response.statusText,
        getErrorMessage(response.statusText, response.status),
        errorType
      );
    }
  }

  async patch({ endpoint, searchParams, useToken = true }: ApiClientPatchType) {
    const url = new URL(`${this.#baseUrl}${endpoint}`);

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(useToken && { Authorization: `Basic ${this.#token}` }),
      },
      body: JSON.stringify(searchParams),
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorType = getErrorTypeByStatus(response.status);
      throw new ApiError(
        response.status,
        response.statusText,
        getErrorMessage(response.statusText, response.status),
        errorType
      );
    }
  }
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export const apiClient = new ApiClient(BASE_URL, TOKEN);
