import { API_URL, USER_ID, USER_PASSWORD } from "./config";

import FetchError from "./customFetchError";
import { generateBasicToken } from "@/utils/auth";

interface Props {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  endPoint: string;
  headers?: RequestInit["headers"];
  body?: RequestInit["body"];
  errorMessage: string;
}

async function fetchWithBasicToken({
  method,
  endPoint,
  headers,
  body,
  errorMessage,
}: Props) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}${endPoint}`, {
    method,
    headers: {
      ...headers,
      Authorization: token,
    },
    body,
  });

  if (!response.ok) {
    throw new FetchError({
      errorMessage,
      statusCode: response.status,
    });
  }

  return response;
}

export default fetchWithBasicToken;
