import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useToast } from '../../../contexts/ToastContext';
import * as S from './Toast.styles';

interface ToastProps {
  duration?: number;
}

const Toast = ({ duration = 1500 }: ToastProps) => {
  const { isVisible, closeToast, message, isSuccess } = useToast();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        closeToast?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, closeToast]);

  if (!isVisible) return null;

  return (
    isVisible &&
    createPortal(
      <div css={S.ToastStyle({ isSuccess })}>
        <div>
          <p css={S.ToastMessage}>{message}</p>
        </div>
      </div>,
      document.getElementById('root') as HTMLElement
    )
  );
};

export default Toast;
