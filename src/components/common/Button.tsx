import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';

type VariantType = 'header' | 'footer' | 'image';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: VariantType;
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
