import { AnyAction } from "redux";
import { RootState } from "..";
import { ThunkAction } from "../../lib/thunk.type";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
