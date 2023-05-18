import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { ToastState } from '../../../types';

interface ToastProps extends ToastState {
  showTime?: number;
}

function Toast({ type, message, showTime = 2000 }: ToastProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, showTime);
  }, [showTime]);

  return <>{show && <div className={`${styles.toast} ${styles[type]}`}>{message}</div>}</>;
}

export default Toast;
