import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  message: string;
}

export default function ErrorToast({ message }: ErrorToastProps) {
  return <div className={styles.toast}>{message}</div>;
}
