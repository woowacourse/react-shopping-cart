import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

type ErrorContextType = {
  error: string;
  showError: (msg: string) => void;
};

const ErrorContext = createContext<ErrorContextType>({
  error: '',
  showError: () => {},
});

export function ErrorProvider({children}: {children: ReactNode}) {
  const [error, setError] = useState('');
  const timerRef = useRef<number | null>(null);

  const showError = useCallback((errorMessage: string) => {
    setError(errorMessage);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setError('');
      timerRef.current = null;
    }, 2000);
  }, []);

  return (
    <ErrorContext.Provider value={{error, showError}}>
      {children}
    </ErrorContext.Provider>
  );
}

export const useError = () => {
  const {error} = useContext(ErrorContext);
  return error;
};

export const useShowError = () => {
  const {showError} = useContext(ErrorContext);
  return showError;
};
