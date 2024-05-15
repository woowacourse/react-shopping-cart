import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL as string;
const USER_ID = import.meta.env.VITE_USER_ID as string;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD as string;

type Method = "GET" | "POST" | "PATCH" | "DELETE";

const apiClient = {
  get(endpoint: string, headers: object) {
    return this.request("GET", endpoint, headers, null);
  },
  post(endpoint: string, headers: object, body: object) {
    return this.request("POST", endpoint, headers, body);
  },
  patch(endpoint: string, headers: object, body: object) {
    return this.request("PATCH", endpoint, headers, body);
  },
  delete(endpoint: string, headers: object) {
    return this.request("PATCH", endpoint, headers, null);
  },

  request(method: Method, endpoint: string, headers: object, body: object | null) {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);
    const requestInit = {
      method,
      headers: { ...headers, Authorization: token, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    };

    return this.fetchWithErrorHandling(endpoint, requestInit);
  },

  async fetchWithErrorHandling(endpoint: string, requestInit: RequestInit) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, requestInit);
      if (!response.ok) {
        throw new Error(`Failed to ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      return error;
    }
  },
};

export default apiClient;
