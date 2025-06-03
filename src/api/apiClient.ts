import {
  DEFAULT_ERROR_MESSAGE,
  FETCH_ERROR_MESSAGE,
} from "../constants/errorMessage";
import { isEmptyResponse, isFetchError, isSuccess } from "./util";

type FetchMethodType = "GET" | "POST" | "DELETE" | "PATCH";

interface ApiClientProps<RequestBody> {
  method: FetchMethodType;
  URI: string;
  body?: RequestBody;
}

type ApiClientType = {
  <Response, RequestBody>(
    options: ApiClientProps<RequestBody> & {
      method: "POST" | "DELETE" | "PATCH";
    }
  ): Promise<Response>;

  <Response>(options: { method: "GET"; URI: string }): Promise<Response>;
};

const apiClient: ApiClientType = async <Response, RequestBody>({
  method,
  URI,
  body,
}: ApiClientProps<RequestBody>): Promise<Response | void> => {
  const basicToken = btoa(
    `${import.meta.env.VITE_API_USERNAME}:${import.meta.env.VITE_API_PASSWORD}`
  );
  const requestURL = `${import.meta.env.VITE_API_BASE_URL}` + URI;
  const response = await fetch(requestURL, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-type": "application/json",
      Authorization: `Basic ${basicToken}`,
    },
  });

  if (isEmptyResponse(response)) {
    return;
  }

  if (isSuccess(response)) {
    return response.json();
  }

  if (isFetchError(response)) {
    const errorBody = await response.json();
    const message =
      errorBody.message ?? FETCH_ERROR_MESSAGE[String(response.status)];
    throw new Error(message);
  }

  throw new Error(DEFAULT_ERROR_MESSAGE);
};

export default apiClient;
