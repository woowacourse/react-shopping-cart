import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Action } from 'redux';
import { RootState } from 'redux/reducers';

import { useAppDispatch } from './useAppDispatch';

type Selector = (state: RootState) => any;

// @TODO : selector, data 타입 지정
const useThunkFetch = <ActionType extends Action>(selector: Selector, thunkActionCreator) => {
  const dispatch = useAppDispatch<ActionType>();
  const { data, error, loading } = useSelector(selector);

  useEffect(() => {
    dispatch(thunkActionCreator());
  }, []);

  return { data, error, loading };
};

export default useThunkFetch;
