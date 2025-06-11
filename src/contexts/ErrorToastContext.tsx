import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import ErrorToast from "../components/ErrorToast";
import { ApiError } from "../constants/ApiError";

interface ErrorToastContextType {
  showError: (error: ApiError | Error | null) => void;
}

const ErrorToastContext = createContext<ErrorToastContextType | undefined>(
  undefined
);

interface ErrorToastContextProviderProps extends PropsWithChildren {}

export const ErrorToastContextProvider = ({
  children,
}: ErrorToastContextProviderProps) => {
  const [error, setError] = useState<{
    message: string;
    timestamp: number;
  } | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = useCallback((err: ApiError | Error | null) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (!err) {
      setError(null);
      return;
    }

    const message = err.message;
    const timestamp = Date.now();

    setError({ message, timestamp });

    // 2초 후 에러 제거
    timer.current = setTimeout(() => {
      setError(null);
      timer.current = null;
    }, 2000);
  }, []);

  return (
    <ErrorToastContext.Provider value={{ showError }}>
      {children}
      {error && (
        <ErrorToast
          key={error.timestamp}
          message={error.message}
          onClose={() => setError(null)}
        />
      )}
    </ErrorToastContext.Provider>
  );
};

export const useErrorToast = () => {
  const errorContext = useContext(ErrorToastContext);
  if (errorContext === undefined) {
    throw new Error("useErrorContext는 프로바이더 안쪽에 위치를 해야 합니다.");
  }
  return errorContext;
};
