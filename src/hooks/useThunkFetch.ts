import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Action, Dispatch } from 'redux';
import { RootState } from 'redux/rootReducer';

import { useAppDispatch } from './useAppDispatch';

type Selector<T> = (state: RootState) => T;
type ThunkActionCreator<T extends Action> = (dispatch: Dispatch<T>) => void;

const useThunkFetch = <StateType, ActionType extends Action, ParamType>(
  selector: Selector<StateType>,
  thunkActionCreator: ThunkActionCreator<ActionType>
): StateType => {
  const dispatch = useAppDispatch<ActionType, ParamType>();
  const state = useSelector(selector);

  useEffect(() => {
    dispatch(thunkActionCreator);
  }, []);

  return state;
};

export default useThunkFetch;
