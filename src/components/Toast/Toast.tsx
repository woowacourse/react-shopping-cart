import { useState, useEffect } from 'react';
import * as styles from './Toast.style';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose?: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
    <div css={styles.toastCss(type)}>
      <h2 css={styles.messageCss}>{message}</h2>
      <button css={styles.closeButtonCss} onClick={handleClose}>
        ✕
      </button>
    </div>
  );
}

export default Toast;
