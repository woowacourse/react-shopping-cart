import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './Button.style';

export type ButtonSize = 's' | 'm' | 'l';
export type ButtonWidth = 'fit' | 'full' | number;
export type ButtonRadius = 's' | 'm' | 'l' | number;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  width?: ButtonWidth;
  radius?: ButtonRadius;
  children: ReactNode;
}

const Button = ({ size = 'm', width = 'fit', radius = 'm', children, ...rest }: ButtonProps) => {
  return (
    <S.Button size={size} width={width} radius={radius} {...rest}>
      {children}
    </S.Button>
  );
};

export default Button;
