import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Button.module.css';
import { Variant } from '../../types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
}

export default function Button({ children, variant, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}
