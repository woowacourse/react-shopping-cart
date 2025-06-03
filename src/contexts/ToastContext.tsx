import { createContext, useState, ReactNode, useCallback } from 'react';
import Toast from '../components/Toast/Toast';

export interface ToastMessage {
  id: number;
  message: string;
  type: 'error' | 'success';
}

interface ToastContextType {
  addToast: (opts: Omit<ToastMessage, 'id'>) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (opts: Omit<ToastMessage, 'id'>) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, ...opts }]);

      setTimeout(() => {
        removeToast(id);
      }, 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}
    </ToastContext.Provider>
  );
}
