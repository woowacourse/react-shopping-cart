import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';
import { Variant } from '../../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
}

export default function Button({
  children,
  variant,
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`${styles[variant]} ${disabled ? styles.disable : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
