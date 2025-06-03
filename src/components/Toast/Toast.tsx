import * as styles from './Toast.style';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div css={styles.toastCss(type)}>
      <h2 css={styles.messageCss(type)}>{message}</h2>
      <button css={styles.closeButtonCss(type)} onClick={onClose}>
        ✕
      </button>
    </div>
  );
}

export default Toast;
