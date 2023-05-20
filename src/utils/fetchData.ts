export interface DataFetcher<T> {
  read: () => T;
}

const fetchData = <T>(url: string): DataFetcher<T> => {
  let data: T | null = null;

  const promise = fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((json) => {
      data = json;
    });

  return {
    read() {
      if (data === null) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw promise;
      } else {
        return data;
      }
    },
  };
};

export default fetchData;
