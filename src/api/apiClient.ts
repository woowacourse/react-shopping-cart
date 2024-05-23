import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL as string;
const USER_ID = import.meta.env.VITE_USER_ID as string;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD as string;

export class FetchError extends Error {
  constructor(public name: "NETWORK" | "RESPONSE_CODE" | "NON_JSON_UNEXPECTED" | "UNKNOWN", message: string) {
    super(message);
  }
}

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
    return this.request("DELETE", endpoint, headers, null);
  },

  request(method: Method, endpoint: string, headers: object, body: object | null) {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);
    const requestInit = {
      method,
      headers: { ...headers, Authorization: token, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    };

    return apiClient._fetchWithRethrow(endpoint, requestInit);
  },
  async _fetchWithRethrow(endpoint: string, requestInit: RequestInit): Promise<object> {
    try {
      return await apiClient._fetchWithThrow(endpoint, requestInit);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new FetchError("NETWORK", `네트워크 에러가 발생하였습니다. :\n ${error.message}`);
      }
      if (error instanceof SyntaxError) {
        throw new FetchError(
          "NON_JSON_UNEXPECTED",
          `서버가 JSON이 아닌 응답을 반환하였습니다. (빈 문자열일 수도 있습니다.) : \n ${error.message}`
        );
      }
      if (!(error instanceof FetchError)) {
        throw new FetchError("UNKNOWN", `미리 규정하지않은 fetch Error가 발생했습니다. :\n ${error.message}`);
      }
      throw error;
    }
  },
  async _fetchWithThrow(endpoint: string, requestInit: RequestInit) {
    const response = await fetch(`${API_URL}${endpoint}`, requestInit);

    if (!response.ok) {
      throw new FetchError("RESPONSE_CODE", "200-299 이외의 응답코드가 도착했습니다.");
    }
    const data = await response.json();
    return data;
  },
};

export default apiClient;
