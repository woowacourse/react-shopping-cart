import { createContext, useContext } from 'react';

interface ToastContext {
  showToast: (msg: string) => void;
}

export const ToastContext = createContext<ToastContext | null>(null);

export const useErrorContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useErrorContext는 ErrorToastProvider로 감싸져야 합니다.');
  }
  return context;
};
