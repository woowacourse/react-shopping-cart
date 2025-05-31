import { createContext, PropsWithChildren, useRef, useState } from "react";

import { Toast } from "../components/common/toast";

export const ToastContext = createContext({ showToast(_message: string) {} });

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    setToast(message);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setTimeout(() => {
      setToast("");
      timerRef.current = null;
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast} />}
    </ToastContext.Provider>
  );
};
