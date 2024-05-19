import { ENV } from "../constants";
import { generateBasicToken } from "./auth";

export function getAuthHeaders(includeContentType: boolean = true) {
  const token = generateBasicToken(ENV.USER_ID, ENV.USER_PASSWORD);
  const headers: HeadersInit = {
    Authorization: token,
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export async function handleResponse(
  response: Response,
  errorMessage: string,
  parseJson: boolean = true
) {
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  if (parseJson) {
    return response.json();
  }
  return response;
}
