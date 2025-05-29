import { API_TOKEN, baseUrl } from "./apiConfig";

type MethodType = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface apiClientProps {
  endpoint: string;
  requestBody?: object;
  method: MethodType;
}

export async function apiClient({
  endpoint,
  requestBody,
  method,
}: apiClientProps) {
  try {
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method,
      headers: {
        ...(["POST", "PATCH", "PUT"].includes(method)
          ? { "Content-Type": "application/json" }
          : {}),
        Authorization: `Basic ${API_TOKEN}`,
      },
      ...(requestBody ? { body: JSON.stringify(requestBody) } : {}),
    });

    if (!response.ok) {
      throw new Error(`Network error! status: ${response.status}`);
    }

    if (method === "GET") {
      const data = await response.json();
      return data.content;
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
