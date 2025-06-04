import { useState, useEffect } from 'react';
import * as styles from './ErrorToast.style';

export default function ErrorToast({ error, duration = 2000 }: { error: Error; duration?: number }) {
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
    <div css={styles.toastCss}>
      <h2 css={styles.messageCss}>{error.message}</h2>
      <button css={styles.closeButtonCss} onClick={handleClose}>
        ✕
      </button>
    </div>
  );
}
