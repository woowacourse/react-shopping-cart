import { generateBasicToken } from "../utils/auth";

const API_URL = process.env.VITE_API_URL as string;
const USER_ID = process.env.VITE_USER_ID as string;
const USER_PASSWORD = process.env.VITE_USER_PASSWORD as string;

type Method = "GET" | "POST" | "PATCH" | "DELETE";

interface ApiProps {
  endpoint: string;
  headers?: Record<string, string>;
  body?: object | null;
}

interface RequestProps extends ApiProps {
  method: Method;
}

const apiClient = {
  get({ endpoint, headers = {} }: ApiProps) {
    return this.request({ method: "GET", endpoint, headers });
  },
  post({ endpoint, headers = {}, body = {} }: ApiProps) {
    return this.request({ method: "POST", endpoint, headers, body });
  },
  patch({ endpoint, headers = {}, body = {} }: ApiProps) {
    return this.request({ method: "PATCH", endpoint, headers, body });
  },
  delete({ endpoint, headers = {} }: ApiProps) {
    return this.request({ method: "DELETE", endpoint, headers });
  },

  request({ method, endpoint, headers = {}, body = null }: RequestProps) {
    // 오프라인 확인
    if (!navigator.onLine) {
      throw new Error("오프라인 상태입니다. 네트워크를 확인해주세요.");
    }

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
        throw new Error(response.statusText);
      }

      const text = await response.text();
      if (text === "") {
        return;
      }

      const data = await JSON.parse(text);
      return data;
    } catch (error) {
      alert(error.message);
      return error;
    }
  },
};

export default apiClient;
