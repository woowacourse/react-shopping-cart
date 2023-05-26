/* eslint-disable @typescript-eslint/no-throw-literal */
export interface DataFetcher<T> {
  read: () => T;
}

const fetchData = <T>(url: string): DataFetcher<T> => {
  let data: T | null = null;
  let hasError = false;

  const promise = fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((json) => {
      data = json;
    })
    .catch(() => {
      hasError = true;
    });

  return {
    read() {
      if (hasError) throw new Error(`Error while fetching ${url}`);
      else if (data === null) throw promise;
      return data;
    },
  };
};

export default fetchData;
