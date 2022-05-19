import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "../lib/thunk.type";
import { RootState } from "../modules";

type AppDispatch<T extends Action> = ThunkDispatch<RootState, null, T>;
export const useAppDispatch = <T extends Action>() =>
  useDispatch<AppDispatch<T>>();
