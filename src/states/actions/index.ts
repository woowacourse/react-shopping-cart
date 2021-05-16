import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export interface Action<T> {
  type: T;
}

export interface ActionWithPayload<A, P> extends Action<A> {
  payload: P;
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
