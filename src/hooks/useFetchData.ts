import { Dispatch, SetStateAction, useEffect } from 'react';

type SetDataType<T> = Dispatch<SetStateAction<T>>;

export const useFetchData = <T>(url: string, setData: SetDataType<T>) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await validateResponse(response);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setData, url]);
};

const validateResponse = async (response: Response) => {
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error(`[HTTP error] status: ${response.status}`);
  }
};
