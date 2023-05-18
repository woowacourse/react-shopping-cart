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
    async <T>(postingData: T, endpoint = ''): Promise<T> => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'POST',
        body: JSON.stringify(postingData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    },
    [entrypoint]
  );

  const patchData = useCallback(
    async <T>(endpoint = ''): Promise<T> => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'PATCH',
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    },
    [entrypoint]
  );

  const deleteData = useCallback(
    async <T>(endpoint = ''): Promise<T> => {
      const response = await fetch(entrypoint + endpoint, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return data;
    },
    [entrypoint]
  );

  return { getData, postData, patchData, deleteData };
};

export default useFetch;
