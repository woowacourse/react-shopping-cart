import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { requestTable } from '../api/request';
import { activateLoading, deactivateLoading } from '../redux/action';
import { persistedStore } from '../redux/store';

const useServerAPI = <T>(getQuery: string) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<Array<T>>([]);

  const getAllData = async (query: string) => {
    try {
      dispatch(activateLoading());
      const data = await requestTable.GET(query);

      setValue(data);
    } catch (error) {
      console.error(error);
      setValue([]);
      persistedStore.purge();
    } finally {
      dispatch(deactivateLoading());
    }
  };

  const getData = async (query: string) => {
    try {
      dispatch(activateLoading());
      const data = await requestTable.GET(query);

      return data;
    } catch (error) {
      console.error(error);
      persistedStore.purge();
    } finally {
      dispatch(deactivateLoading());
    }
  };

  const postData = async <I extends T>(query: string, payload: I) => {
    try {
      dispatch(activateLoading());

      const response = await requestTable.POST<I>(query, payload);

      if (!response.ok) throw new Error(await response.text());

      setValue((prevState) => {
        const newState = [...prevState];
        newState.push({
          ...payload,
        });

        return newState;
      });
    } catch (error) {
      console.error(error);
      persistedStore.purge();
    } finally {
      dispatch(deactivateLoading());
    }
  };

  useEffect(() => {
    getAllData(getQuery);

    return () => setValue([]);
  }, []);

  return { value, setValue, getAllData, getData, postData };
};

export default useServerAPI;
