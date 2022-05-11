import type { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'redux/reducers';
import type { Action } from 'redux';
import { useDispatch } from 'react-redux';

type AppDispatch<T extends Action> = ThunkDispatch<RootState, null, T>;

export const useAppDispatch = <T extends Action>() => useDispatch<AppDispatch<T>>();
