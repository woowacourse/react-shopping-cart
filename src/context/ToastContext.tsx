import { createContext, useContext, useRef, useState } from 'react';

interface ToastProviderProps {
  toast: string;
  isVisible: boolean;
  setToast: (toast: string) => void;
  showToast: (message: string) => void;
}

export const ToastContext = createContext<ToastProviderProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<number>();

  const showToast = (msg: string) => {
    console.log('showToast', msg);
    if (timerRef.current) {
      console.log('clearTimeout', timerRef.current);
      clearTimeout(timerRef.current);
    }

    setIsVisible(false);
    setToast(msg);
    setIsVisible(true);

    timerRef.current = window.setTimeout(() => {
      console.log('setTimeout', timerRef.current);
      setIsVisible(false);
      timerRef.current = undefined;
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, isVisible, setToast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext;
