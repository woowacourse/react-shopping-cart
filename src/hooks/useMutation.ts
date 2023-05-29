import { useCallback, useState } from 'react';

interface Error {
  message: string;
  payload?: any;
}

interface UseMutationState {
  loading: boolean;
  data?: any;
  error?: Error;
}

export const useMutation = (method: string, headers: HeadersInit) => {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
  });

  const { loading, data, error } = state;

  const mutation = useCallback(
    async (url: string, bodyData?: object) => {
      setState({ loading: true });

      try {
        const response = await fetch(url, {
          method,
          ...(headers && { headers }),
          ...(bodyData && { body: JSON.stringify(bodyData) }),
        });

        const location = response.headers.get('location');

        setState((prev) => ({ ...prev, data: { location } }));

        if (response.ok) {
          return { location };
        }
      } catch (error) {
        console.log(error);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [method]
  );

  return { mutation, loading, data, error };
};
