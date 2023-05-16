import { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface ToastProps {
  message: string;
  showTime?: number;
  error?: boolean;
}

function Toast({ message, showTime = 2000, error = false }: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, showTime);
  }, [showTime]);

  return <>{show && <div className={`${styles.toast} ${error && styles.error}`}>{message}</div>}</>;
}

export default Toast;
