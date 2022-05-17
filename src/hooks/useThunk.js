import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunk());
  }, []);
};
