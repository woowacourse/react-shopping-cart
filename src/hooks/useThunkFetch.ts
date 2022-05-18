import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Action, Dispatch } from 'redux';
import { RootState } from 'redux/reducers';

import { useAppDispatch } from './useAppDispatch';

interface State<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

type Selector<T> = (state: RootState) => State<T>;
type ThunkActionCreator<T extends Action> = () => (dispatch: Dispatch<T>) => void;

const useThunkFetch = <DataType, ActionType extends Action>(
  selector: Selector<DataType>,
  thunkActionCreator: ThunkActionCreator<ActionType>
) => {
  const dispatch = useAppDispatch<ActionType>();
  const { data, error, loading } = useSelector(selector);

  useEffect(() => {
    dispatch(thunkActionCreator());
  }, []);

  return { data, error, loading };
};

export default useThunkFetch;
