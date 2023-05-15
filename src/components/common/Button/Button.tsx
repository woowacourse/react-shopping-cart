import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import * as S from './Button.styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size: 'SS' | 'S' | 'M' | 'L';
  view: 'light' | 'dark';
}

const Button = ({
  size,
  view,
  type = 'submit',
  children,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <S.Button type={type} size={size} view={view}>
      {children}
    </S.Button>
  );
};

export default Button;
