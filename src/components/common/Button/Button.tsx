import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import * as S from './Button.styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size: 'SS' | 'S' | 'M' | 'L';
  view: 'light' | 'dark';
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  return (
    <S.Button type="button" {...props}>
      {props.children}
    </S.Button>
  );
};

export default Button;
