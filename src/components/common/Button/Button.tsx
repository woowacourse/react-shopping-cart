import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  customStyle?: string;
}

function Button({ customStyle = '', content, ...rest }: ButtonProps) {
  return (
    <S.Layout $isActive={!rest.disabled} $customStyle={customStyle} {...rest}>
      {content}
    </S.Layout>
  );
}

export default Button;
