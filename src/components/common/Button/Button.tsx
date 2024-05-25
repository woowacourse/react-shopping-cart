import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './Button.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 's' | 'm' | 'l' | 'fit';
  width?: 'fit' | 'full' | number;
  radius?: 's' | 'm' | 'l' | number;
  color?: 'default' | 'primary';
  disabled?: boolean;
  isSquare?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'm',
  width = 'fit',
  radius = 'm',
  color = 'default',
  isSquare = false,
  children,
  disabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button
      {...rest}
      $isSquare={isSquare}
      disabled={disabled}
      size={size}
      width={width}
      radius={radius}
      color={color}
    >
      {children}
    </S.Button>
  );
};

export default Button;
