import { useEffect, useState } from 'react';

interface State<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

export const useQuery = <T>(url: string, headers?: HeadersInit) => {
  const [state, setState] = useState<State<T>>({
    loading: false,
  });

  const { loading, data, error } = state;

  useEffect(() => {
    fetchData();
  }, [url]);

  const fetchData = async () => {
    try {
      setState({ loading: true });

      const response = await fetch(url, {
        ...(headers && { headers }),
      });

      const contentType = response.headers.get('content-type');

      if (response.ok && contentType === 'application/json') {
        const data = await response.json();

        setState((prev) => ({ ...prev, data }));
      }
    } catch {
      setState((prev) => ({ ...prev, error }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return { loading, data, error };
};
