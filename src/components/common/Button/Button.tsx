import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import * as S from './Button.styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size: 'SS' | 'S' | 'M' | 'L';
  view: 'white' | 'black';
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, ...restProps } = props;

  return (
    <S.Button type="button" {...restProps}>
      {props.children}
    </S.Button>
  );
};

export default Button;
