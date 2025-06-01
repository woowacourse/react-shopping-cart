import { useEffect, useState } from "react";
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
  const [isValidating, setIsValidating] = useState(true);

  const state = location.state;
  useEffect(() => {
    if (!validationFn(state)) {
      navigate(redirectPath);
      return;
    }

    setIsValidating(false);
  }, [navigate, state, validationFn, redirectPath]);

  return { state, isValidating };
};

export default useValidateLocationState;
