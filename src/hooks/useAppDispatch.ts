import { useDispatch } from 'react-redux';
import type { Action } from 'redux';
import { RootState } from 'redux/rootReducer';
import type { ThunkDispatch } from 'redux-thunk';

export type AppDispatch<T extends Action, U> = ThunkDispatch<RootState, U, T>;

export const useAppDispatch = <T extends Action, U = null>() => useDispatch<AppDispatch<T, U>>();
