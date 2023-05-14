import { useState } from 'react';
import Toast from '..';

export type ToastType = 'error' | 'success';
export interface ToastState {
  message: string;
  type: ToastType;
}

export const useToast = () => {
  const [toastState, setToastState] = useState<ToastState | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToastState({ message: message, type: type });
  };

  const toast = {
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
  };

  const renderToast = toastState && (
    <Toast message={toastState.message} type={toastState.type} />
  );

  return { showToast, toast, renderToast };
};
