import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  isActive?: boolean;
  customStyle?: string;
}

function Button({ isActive = true, customStyle = '', content, ...rest }: ButtonProps) {
  return (
    <S.Layout $isActive={isActive} $customStyle={customStyle} {...rest}>
      {content}
    </S.Layout>
  );
}

export default Button;
