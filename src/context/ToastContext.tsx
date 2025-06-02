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

  const showToast = (msg: string) => {
    setIsVisible(false);

    setToast(msg);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
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
