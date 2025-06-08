import { createContext, useContext } from 'react';

interface ToastContext {
  showToast: (msg: string) => void;
}

export const ToastContext = createContext<ToastContext | null>(null);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext는 ErrorToastProvider로 감싸져야 합니다.');
  }
  return context;
};
