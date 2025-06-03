import { createContext, useContext, useState } from 'react';
import Toast from '../components/@common/toast/Toast';
import useBoolean from '../hooks/useBoolean';

type ToastContextType = {
  isVisible: boolean;
  openToast: (message: string, isOk: boolean) => void;
  closeToast: () => void;
  message: string;
  isSuccess: boolean;
};

const ToastContext = createContext<ToastContextType>({
  isVisible: false,
  openToast: () => {},
  closeToast: () => {},
  message: '',
  isSuccess: false,
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    value: isVisible,
    setTrue: open,
    setFalse: close,
  } = useBoolean(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const openToast = (message: string, isOk: boolean) => {
    setMessage(message);
    setIsSuccess(isOk);
    open();
  };

  const closeToast = () => {
    setMessage('');
    setIsSuccess(false);
    close();
  };

  return (
    <ToastContext.Provider
      value={{ isVisible, openToast, closeToast, message, isSuccess }}
    >
      {children}
      {isVisible && <Toast />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
