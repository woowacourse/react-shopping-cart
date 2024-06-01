import { useContext } from 'react';
import { ToastContext, ToastContextType } from '../context/ToastProvider';

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast 함수는 ToastProvider 컴포넌트 안에서 실행되어야합니다.');
  }
  return context;
};
