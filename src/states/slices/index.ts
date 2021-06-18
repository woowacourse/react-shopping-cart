import { AnyAction, AsyncThunk } from '@reduxjs/toolkit';

type AnyAsyncThunk = AsyncThunk<any, any, any>;

type PendingAction = ReturnType<AnyAsyncThunk['pending']>;
type RejectedAction = ReturnType<AnyAsyncThunk['rejected']>;

export const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.endsWith('/pending');

export const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.endsWith('/rejected');
