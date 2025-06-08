import { createContext, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/common/Toast/Toast';

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
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsVisible(false);
    setToast(msg);
    setIsVisible(true);

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      timerRef.current = undefined;
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, isVisible, setToast, showToast }}>
      {children}
      {isVisible && createPortal(<Toast>{toast}</Toast>, document.body)}
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
