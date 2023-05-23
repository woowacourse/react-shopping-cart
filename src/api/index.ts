import { useEffect, Dispatch, SetStateAction } from 'react';
import { fetchData } from '../utils/fetchData';

type SetDataType<T> = Dispatch<SetStateAction<T>>;

export const useSetFetchedData = <T>(url: string, setData: SetDataType<T>) => {
  useEffect(() => {
    const setFetchedData = async () => {
      const data = await fetchData(url);

      setData(data);
    };

    setFetchedData();
  }, [url, setData]);
};
