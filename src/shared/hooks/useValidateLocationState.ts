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
  const [validatedState, setValidatedState] = useState<T | null>(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const state = location.state;
    if (!validationFn(state)) {
      navigate(redirectPath);
      return;
    }

    setValidatedState(state);
    setIsValidating(false);
  }, [navigate, location.state, validationFn, redirectPath]);

  return { validatedState, isValidating };
};

export default useValidateLocationState;
