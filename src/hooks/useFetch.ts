import { useCallback } from 'react';

const useFetch = (entrypoint: string) => {
  const getData = useCallback(async <T>(): Promise<T> => {
    const response = await fetch(entrypoint);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  }, [entrypoint]);

  const postData = useCallback(
    async <T>(postingData: T, endpoint = '') => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postingData),
      });

      if (!response.ok) throw new Error();

      const location = response.headers.get('Location');

      return location;
    },
    [entrypoint]
  );

  const patchData = useCallback(
    async <T>(patchingData: T, endpoint = '') => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchingData),
      });

      if (!response.ok) throw new Error();
    },
    [entrypoint]
  );

  const deleteData = useCallback(
    async (endpoint = '') => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error();
    },
    [entrypoint]
  );

  return { getData, postData, patchData, deleteData };
};

export default useFetch;
