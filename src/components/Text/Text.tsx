import { HTMLAttributes, PropsWithChildren } from 'react';
import * as S from './Text.styles';

export type TextVariant = 'title-1' | 'title-2' | 'title-3' | 'body-0' | 'body-1' | 'body-2' | 'body-3';

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant;
  color?: string;
}

export default function Text({ variant = 'body-2', color = '#000', children, ...props }: PropsWithChildren<TextProps>) {
  return (
    <S.Text variant={variant} color={color} {...props}>
      {children}
    </S.Text>
  );
}
