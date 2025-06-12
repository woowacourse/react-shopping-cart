import { useLocation } from "react-router-dom";

interface UsePageStateProps<T> {
  validateFunc: (state: T) => boolean;
}

const usePageState = <T>({ validateFunc }: UsePageStateProps<T>): T | null => {
  const location = useLocation();
  const state = location.state;

  if (!validateFunc(state)) {
    return null;
  }

  return state;
};

export default usePageState;
