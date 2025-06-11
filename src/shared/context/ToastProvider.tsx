import { createContext, PropsWithChildren, useContext, useMemo, useRef, useState } from 'react';

import { Toast } from '../../shared/components/Toast/Toast';

export const ToastContext = createContext({
  showToast(_message: string, _duration: number = 3000) {},
});

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToastContext는 ToastProvider 내에서 호출해주세요.');
  return context;
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string, duration = 3000) => {
    setToast(message);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToast('');
      timerRef.current = null;
    }, duration);
  };

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && <Toast>{toast}</Toast>}
    </ToastContext.Provider>
  );
};
