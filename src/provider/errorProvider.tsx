import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ErrorContextType = {
  error: string;
  displayTemporaryError: (msg: string) => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState("");
  const timerRef = useRef<number | null>(null);

  const displayTemporaryError = useCallback((errorMessage: string) => {
    setError(errorMessage);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setError("");
      timerRef.current = null;
    }, 2000);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, displayTemporaryError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export const useErrorToast = () => {
  const error = useContext(ErrorContext);
  return error?.error;
};

export const useShowError = () => {
  const error = useContext(ErrorContext);
  return error?.displayTemporaryError;
};
