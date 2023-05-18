import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { ToastState } from '../../../types';

interface ToastProps extends ToastState {
  showTime?: number;
}

function Toast({ type, message, showTime = 2000 }: ToastProps) {
  const [startHide, setStartHide] = useState(false);
  const [show, setShow] = useState(true);

  const headIcon = () => {
    if (type === 'success') {
      return '✅';
    } else if (type === 'warning') {
      return '⚠️';
    } else {
      return '❌';
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStartHide(true);
    }, showTime);
    setTimeout(() => {
      setShow(false);
    }, showTime + 300);
  }, [showTime]);

  return (
    <>
      {show && (
        <div className={`${styles.toast} ${styles[type]} ${startHide && styles['toast-hide']}`}>
          {`${headIcon()} ${message}`}
        </div>
      )}
    </>
  );
}

export default Toast;
