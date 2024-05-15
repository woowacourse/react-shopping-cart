import { ReactNode } from 'react';
import * as S from './Text.style'

export type TextProps = {
  size?: 's' | 'm' | 'l' | number;
  weight?: 's' | 'm' | 'l';
  children: ReactNode;
};


const Text = ({ children, size = 'm', weight = 'l' }: TextProps) => {
  return (
    <S.Text size={size} weight={weight}>
      {children}
    </S.Text>
  );
};

export default Text;
