import { ComponentProps } from 'react';
import * as S from './FooterButton.styles';

function FooterButton({ ...props }: ComponentProps<'button'>) {
  return <S.Container {...props}></S.Container>;
}

export default FooterButton;
