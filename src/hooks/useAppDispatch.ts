import { useDispatch } from 'react-redux';
import type { Action } from 'redux';
import { RootState } from 'redux/reducers';
import type { ThunkDispatch } from 'redux-thunk';

type AppDispatch<T extends Action> = ThunkDispatch<RootState, null, T>;

export const useAppDispatch = <T extends Action>() => useDispatch<AppDispatch<T>>();
