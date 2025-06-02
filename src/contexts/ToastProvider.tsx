import { ReactNode, useMemo, useState } from 'react';
import { ToastContext } from './ToastContext';
import Toast from '../components/Toast';

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState('');

  const contextValue = useMemo(() => {
    return {
      showToast: (msg: string) => setToast(msg),
    };
  }, []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toast && <Toast message={toast} onLater={() => setToast('')} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
