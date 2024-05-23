import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  isActive?: boolean;
}

function Button({ isActive = true, content, ...rest }: ButtonProps) {
  return (
    <S.Layout $isActive={isActive} {...rest}>
      {content}
    </S.Layout>
  );
}

export default Button;
