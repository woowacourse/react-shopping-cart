import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type UseValidateLocationStateParams<T> = {
  validationFn: (state: any) => state is T;
  redirectPath: string;
};

const useValidateLocationState = <T>({
  validationFn,
  redirectPath,
}: UseValidateLocationStateParams<T>) => {
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

  return { state: validationFn(state) ? state : null, isValidating };
};

export default useValidateLocationState;
