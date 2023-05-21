import { useCallback, useState } from 'react';

interface UseMutationState {
  loading: boolean;
  data?: Object;
  error?: object;
}

export const useMutation = (method: string) => {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
  });

  const { loading, data, error } = state;

  const mutation = useCallback(
    (url: string, bodyData?: object) => {
      setState({ loading: true });

      fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(bodyData && { body: JSON.stringify(bodyData) }),
      })
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .then((json) => setState((prev) => ({ ...prev, data: json })))
        .catch((error) => setState((prev) => ({ ...prev, error })))
        .finally(() => setState((prev) => ({ ...prev, loading: false })));
    },
    [method]
  );

  return { mutation, loading, data, error };
};
