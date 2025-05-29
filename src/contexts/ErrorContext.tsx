import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import ErrorToast from '../components/ErrorToast/ErrorToast';

interface ErrorContextType {
  showError: (error: Error) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  const showError = useCallback((error: Error) => {
    setError(error);
  }, []);
  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {error && <ErrorToast error={error} />}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  const errorContext = useContext(ErrorContext);
  if (errorContext === undefined) {
    throw new Error('useErrorContext는 프로바이더 안쪽에 위치를 해야 합니다.');
  }
  return errorContext;
};
