import { RootState } from 'redux/reducers';
import type { Action } from 'redux';
import { useAppDispatch } from './useAppDispatch';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

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
