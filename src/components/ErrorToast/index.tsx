import { useState, useEffect } from "react";
import * as styles from "./ErrorToast.style";
import { createPortal } from "react-dom";

export default function ErrorToast({
  message,
  onClose,
  duration = 2000,
}: {
  message: string;
  onClose: () => void;
  duration?: number;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(onClose, 300);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return createPortal(
    <div css={[styles.toastCss, !visible && styles.fadeOutSmoothCss]}>
      <h2 css={styles.messageCss} id="error-toast-message">
        {message}
      </h2>
      <button css={styles.closeButtonCss} onClick={handleClose}>
        ✕
      </button>
    </div>,
    document.body
  );
}
