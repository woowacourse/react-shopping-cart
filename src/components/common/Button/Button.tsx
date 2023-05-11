import { ReactNode, forwardRef } from 'react';
import type { ComponentPropsWithRef, ForwardedRef } from 'react';

import * as S from './Button.styles';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'textButton';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode | string;
}

const Button = (
  { variant = 'default', size = 'medium', children, ...attributes }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <S.Button ref={ref} variant={variant} size={size} {...attributes}>
      {children}
    </S.Button>
  );
};

export default forwardRef(Button);
