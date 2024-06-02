import { createContext, useState, useCallback, ReactNode } from 'react';
import ErrorToast from '../components/ErrorToast/ErrorToast';

export interface ToastContextType {
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = useCallback((message: string) => {
    setMessage(message);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 10000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {isOpen && <ErrorToast message={message} />}
    </ToastContext.Provider>
  );
}
