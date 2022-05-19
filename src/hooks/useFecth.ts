import { useEffect } from 'react';
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
