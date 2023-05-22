import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import * as S from './Button.styles';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  size: 'SS' | 'S' | 'M' | 'L';
  view: 'white' | 'black';
}

const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, size, ...restProps } = props;

  if (size === 'SS')
    return (
      <S.ExtraSmallButton type="button" {...restProps}>
        {children}
      </S.ExtraSmallButton>
    );
  if (size === 'S')
    return (
      <S.SmallButton type="button" {...restProps}>
        {children}
      </S.SmallButton>
    );
  if (size === 'M')
    return (
      <S.MediumButton type="button" {...restProps}>
        {children}
      </S.MediumButton>
    );
  if (size === 'L')
    return (
      <S.LargeButton type="button" {...restProps}>
        {children}
      </S.LargeButton>
    );

  return null;
};

export default Button;
