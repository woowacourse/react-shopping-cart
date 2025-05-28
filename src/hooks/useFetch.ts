import { useCallback, useState } from "react";
import { ApiError } from "../constants/ApiError";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";
import { getErrorMessage } from "../util/getErrorMessage";
import { createApiError } from "../util/createApiError";

interface UseFetchParams {
  endpoint: string;
  fetchOptions: {
    method: "PATCH" | "DELETE";
    headers: Record<string, string>;
    body: Record<string, string>;
  };

  useToken: boolean;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

export function useFetch({
  endpoint,
  fetchOptions,
  useToken = true,
}: UseFetchParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetcher = useCallback(async () => {
    const url = new URL(`${BASE_URL}${endpoint}`);

    const options = {
      method: fetchOptions.method,
      headers: {
        ...fetchOptions.headers,
        accept: "application/json",
        ...(useToken && { Authorization: `Basic ${TOKEN}` }),
      },
      body: JSON.stringify(fetchOptions.body),
    };

    try {
      setIsLoading(true);
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

      if (response.status === 201 || response.status === 204) {
        return null;
      }
    } catch (error) {
      setError(createApiError(error));
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, useToken]);

  return { fetcher, error, isLoading };
}
