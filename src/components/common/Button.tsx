import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'header' | 'footer';
}

export default function Button({ children, variant, ...props }: PropsWithChildren<ButtonProps>) {
  const buttonVariant = variant ?? '';

  return (
    <button
      className={`${styles[buttonVariant]} ${props.disabled ? styles.disable : ''}`}
      disabled={props.disabled}
      {...props}
    >
      {children}
    </button>
  );
}
