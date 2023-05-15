import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import * as S from './Button.styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size: 'SS' | 'S' | 'M' | 'L';
  view: 'light' | 'dark';
}

const Button: React.FC<ButtonProps> = ({
  type = 'submit',
  size,
  view,
  onClick,
  children,
}) => {
  return (
    <S.Button type={type} size={size} view={view} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
