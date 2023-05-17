import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';
import { fetchApi } from '../api';

type SetData<T> = SetterOrUpdater<T> | Dispatch<SetStateAction<T>>;

export const useSetFetchedData = <T>(url: string, setData: SetData<T>) => {
  const setFetchedData = useCallback(async () => {
    const rawData = await fetchApi(url);
    setData(rawData);
  }, [url, setData]);

  useEffect(() => {
    const timerId = setTimeout(() => setFetchedData(), 0);
    return () => clearTimeout(timerId);
  }, [setFetchedData]);
};
