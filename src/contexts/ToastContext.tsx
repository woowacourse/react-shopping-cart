import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from '../components/Toast/Toast';

interface ToastContextType {
  type: 'error' | 'success';
  showToast: (message: string, type: 'error' | 'success') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'error' | 'success'>('success');

  const showToast = useCallback((message: string, type: 'error' | 'success') => {
    setMessage(message);
    setType(type);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, type }}>
      {children}
      {message && <Toast message={message} type={type} />}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const toastContext = useContext(ToastContext);
  if (toastContext === undefined) {
    throw new Error('useToastContext는 프로바이더 안쪽에 위치를 해야 합니다.');
  }
  return toastContext;
};
