import { API_TOKEN } from "./apiConfig";

type MethodType = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface apiClientProps {
  url: string;
  requestBody: string;
  method: MethodType;
}

export async function apiClient({ url, requestBody, method }: apiClientProps) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...(["POST", "PATCH", "PUT"].includes(method)
          ? { ContentType: "application/json" }
          : {}),
        Authorization: `Basic ${API_TOKEN}`,
      },
      ...(requestBody ? { body: JSON.stringify(requestBody) } : {}),
    });

    if (!response.ok) {
      throw new Error(`Network error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
