import { createContext, useEffect, useRef, useState } from "react";
import Toast from "../components/Toast/Toast";
import { TOAST_TYPES, ToastType } from "../components/Toast/type";

interface ToastContextType {
  showToast: ({ message, type, duration }: ShowToastProps) => void;
}

interface ShowToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>(TOAST_TYPES.SUCCESS);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, []);

  const showToast = ({
    message,
    type = TOAST_TYPES.SUCCESS,
    duration = 4000,
  }: ShowToastProps) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }

    setType(type);
    setMessage(message);

    toastTimer.current = setTimeout(() => {
      setMessage("");
      toastTimer.current = null;
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {!!message && <Toast message={message} type={type} />}
    </ToastContext.Provider>
  );
};
