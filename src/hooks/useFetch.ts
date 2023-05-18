import { useCallback } from 'react';

const useFetch = (entrypoint: string) => {
  const getData = useCallback(
    async <T>(endpoint = ''): Promise<T> => {
      const response = await fetch(entrypoint + endpoint);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    },
    [entrypoint]
  );

  const postData = useCallback(
    async <T>(postingData: T, endpoint = '') => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'POST',
        body: JSON.stringify(postingData),
      });

      if (!response.ok) throw new Error();

      const location = response.url;

      return location;
    },
    [entrypoint]
  );

  const patchData = useCallback(
    async <T>(patchingData: T, endpoint = '') => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'PATCH',
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
