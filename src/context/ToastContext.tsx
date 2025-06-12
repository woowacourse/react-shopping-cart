import { createContext, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Toast from '../components/common/Toast/Toast';

interface ToastProviderProps {
  showToast: (message: string) => void;
}
interface ToastItem {
  id: number;
  message: string;
}

export const ToastContext = createContext<ToastProviderProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<number, number>>({});
  const nextId = useRef(0);

  const showToast = (message: string) => {
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};

    setToasts([]);

    const id = nextId.current++;
    setToasts([{ id, message }]);
    timersRef.current[id] = window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      delete timersRef.current[id];
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((t) =>
        createPortal(<Toast key={t.id}>{t.message}</Toast>, document.body)
      )}
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
