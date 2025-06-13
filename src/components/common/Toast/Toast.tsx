import { ToastContainer, Message } from './Toast.styles';

interface ToastProps {
  children: React.ReactNode;
}

function Toast({ children }: ToastProps) {
  return (
    <div css={ToastContainer}>
      <span css={Message}>{children}</span>
    </div>
  );
}

export default Toast;
