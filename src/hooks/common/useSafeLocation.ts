import { useLocation } from "react-router-dom";

export default function useSafeLocationState<T>() {
  const location = useLocation();
  return location.state as T;
}
