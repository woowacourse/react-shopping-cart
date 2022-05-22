import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useThunkFetch = ({ selector, thunkAction, deps }): RootState | any => {
  const data = useSelector(selector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkAction());
  }, deps);

  return data;
};

export const useFetch = ({ action, deps }) => {
  const [response, setResponse] = useState({ isLoading: true, data: null });

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await action();

        setResponse(prev => ({ ...prev, isLoading: false, data }));
      } catch ({ message }) {
        setResponse(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetch();
  }, deps);

  return response;
};
