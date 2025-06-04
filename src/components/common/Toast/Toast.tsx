import { ToastContainer, Message } from './Toast.styles';

interface ToastProps {
  message: string | null;
}

function Toast({ message }: ToastProps) {
  return (
    <div css={ToastContainer}>
      <span css={Message}>{message}</span>
    </div>
  );
}

export default Toast;
