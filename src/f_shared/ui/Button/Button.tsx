import classnames from 'classnames/bind';
import { ReactNode } from 'react';

import css from './Button.module.css';

const cn = classnames.bind(css);

type ButtonTheme = 'common' | 'primary';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  theme?: ButtonTheme;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  children,
  className,
  disabled = false,
  theme = 'common',
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn('root', `theme_${theme}`, { disabled }, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
