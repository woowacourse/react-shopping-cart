import { useState, useEffect } from 'react';
import * as styles from './Toast.style';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  duration?: number;
}

export default function Toast({ message, type, duration = 2000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
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
