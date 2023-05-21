import { useCallback, useEffect, useState } from 'react';

interface State<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

export const useQuery = <T>(url: string) => {
  const [state, setState] = useState<State<T>>({
    loading: false,
  });

  const { loading, data, error } = state;

  useEffect(() => {
    setState({ loading: true });

    fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((json) => setState((prev) => ({ ...prev, data: json })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [url]);

  const refetchData = useCallback(async () => {
    setState({ loading: true });

    await fetch(url)
      .then((response) => response.json())
      .catch((error) => console.log(error))
      .then((json) => setState((prev) => ({ ...prev, data: json })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, [url]);

  return { loading, data, error, refetchData };
};
