import classnames from 'classnames/bind';

import css from './Button.module.css';

const cn = classnames.bind(css);

type ButtonTheme = 'common' | 'primary';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  label: string;
  theme?: ButtonTheme;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  className,
  disabled = false,
  label,
  theme = 'common',
  type = 'button',
  onClick,
}: ButtonProps) {
  console.log(`root_theme_${theme}`);
  return (
    <button
      className={cn('root', `theme_${theme}`, { root_disabled: disabled }, className)}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
