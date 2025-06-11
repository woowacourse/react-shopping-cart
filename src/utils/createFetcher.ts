import { baseAPI } from '../api/baseAPI';

function createFetcher<T>() {
  const fetch = async (path: string) => {
    const data = await baseAPI<T>({
      method: 'GET',
      path,
    });
    return data;
  };

  return fetch;
}

export default createFetcher;
