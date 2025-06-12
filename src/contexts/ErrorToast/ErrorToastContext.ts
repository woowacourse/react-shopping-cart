import { createContext, useContext } from 'react';

type ErrorToastContextType = {
  showError: (message: string) => void;
};

export const ErrorToastContext = createContext<ErrorToastContextType | null>(
  null
);

export const useErrorToast = () => {
  const context = useContext(ErrorToastContext);

  if (!context) throw new Error('ErrorToastProvider 안에서 사용해야 합니다.');

  return context;
};
