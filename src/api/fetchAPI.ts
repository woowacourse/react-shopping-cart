interface OptionalProps {
  method?: string;
  headers?: HeadersInit;
  body?: object;
}

export const fetchAPI = async (url: string, optionalProps?: OptionalProps) => {
  const options: RequestInit & { Authorization?: string } = {
    method: optionalProps?.method,
    headers: optionalProps?.headers,
    body: optionalProps?.body ? JSON.stringify(optionalProps?.body) : undefined,
  };

  const response = await fetch(url, options);
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    const unKnownErrorMessage = '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요';

    if (contentType === 'application/json') {
      const error = await response.json();

      throw new Error(error?.payload?.errorMessage || unKnownErrorMessage);
    }

    throw new Error(unKnownErrorMessage);
  }

  if (contentType === 'application/json') {
    const data = await response.json();

    return data;
  }

  return;
};
