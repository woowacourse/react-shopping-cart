import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UseValidateLocationStateParams<T> = {
  validationFn: (state: any) => state is T;
  redirectPath: string;
};

type UseValidateLocationStateResult<T> =
  | { isValidating: true; state: null }
  | { isValidating: false; state: T };

const useValidateLocationState = <T>({
  validationFn,
  redirectPath,
}: UseValidateLocationStateParams<T>): UseValidateLocationStateResult<T> => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;
  const isValid = validationFn(state);
  useEffect(() => {
    if (!isValid) {
      navigate(redirectPath);
      return;
    }
  }, [isValid, navigate, redirectPath]);

  const isValidating = !isValid;
  const validationState = isValidating
    ? { isValidating, state: null }
    : { isValidating, state };

  return validationState;
};

export default useValidateLocationState;
