import { useCallback, useState } from 'react';

interface Return<BodyData, ResponseData> {
  mutateQuery: (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: BodyData, id?: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  responseData: ResponseData | null;
}

const useMutationQuery = <BodyData, ResponseData>(
  fetchUrl: string,
  headers?: HeadersInit
): Return<BodyData, ResponseData> => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutateQuery = useCallback(
    async (method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', data?: BodyData, id = '') => {
      setLoading(true);
      setError(null);

      const body = data ? JSON.stringify(data) : null;

      return await fetch(`${fetchUrl}/${id}`, {
        method,
        body,
        headers,
      })
        .then(res => res.json())
        .then(data => setResponseData(data))
        .catch((error: Error) => setError(error.message))
        .finally(() => setLoading(false));
    },
    [fetchUrl, headers]
  );

  return { responseData, loading, error, mutateQuery };
};

export default useMutationQuery;
