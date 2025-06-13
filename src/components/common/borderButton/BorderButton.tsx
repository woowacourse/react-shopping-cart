import { ComponentProps } from 'react';
import * as S from './BorderButton.styles';

function BorderButton({ children, ...props }: ComponentProps<'button'>) {
  return <S.Container {...props}>{children}</S.Container>;
}

export default BorderButton;
