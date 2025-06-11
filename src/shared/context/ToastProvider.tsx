import { createContext, PropsWithChildren, useMemo, useRef, useState } from 'react';

import { Toast } from '../../shared/components/Toast/Toast';

export const ToastContext = createContext({
  showToast(_message: string, _duration: number = 3000) {},
});

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
