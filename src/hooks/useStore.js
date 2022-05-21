import { useDispatch, useSelector } from "react-redux";

export const useStore = (reducerKey) => {
  const { data, isLoading, errorMessage } = useSelector(
    (state) => state[reducerKey]
  );
  const dispatch = useDispatch();

  return { data, isLoading, errorMessage, dispatch };
};
