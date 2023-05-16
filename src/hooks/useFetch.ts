import { Dispatch, SetStateAction, useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';
import { fetchApi } from '../api';

type SetData<T> = SetterOrUpdater<T> | Dispatch<SetStateAction<T>>;

export const useSetFetchedData = <T>(url: string, setData: SetData<T>) => {
  const setFetchedData = async () => {
    const rawData = await fetchApi(url);
    setData(rawData);
  };

  useEffect(() => {
    const timerId = setTimeout(() => setFetchedData(), 3000);
    return () => clearTimeout(timerId);
  }, [url, setData]);
};
