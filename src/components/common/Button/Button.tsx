import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './Button.style';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 's' | 'm' | 'l';
  width?: 'fit' | 'full' | number;
  radius?: 's' | 'm' | 'l' | number;
  children: ReactNode;
  color?: 'default' | 'primary';
  square?: boolean;
}

const Button = ({ size = 'm', width = 'fit', radius = 'm', color = 'default', children, ...rest }: ButtonProps) => {
  return (
    <S.Button size={size} width={width} radius={radius} color={color} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
