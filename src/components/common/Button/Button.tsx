import { ButtonHTMLAttributes, ReactNode } from 'react';

import * as S from './Button.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 's' | 'm' | 'l' | 'fit';
  width?: 'fit' | 'full' | number;
  radius?: 's' | 'm' | 'l' | number;
  color?: 'default' | 'primary';
  isDisabled?: boolean;
  square?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'm',
  width = 'fit',
  radius = 'm',
  color = 'default',
  square = false,
  children,
  isDisabled = false,
  ...rest
}: ButtonProps) => {
  return (
    <S.Button
      disabled={isDisabled}
      size={size}
      width={width}
      radius={radius}
      color={color}
      square={square}
      {...rest}
    >
      {children}
    </S.Button>
  );
};

export default Button;
