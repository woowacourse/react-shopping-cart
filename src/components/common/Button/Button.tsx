import { ButtonHTMLAttributes } from 'react';
import * as S from './Button.style';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  customStyle?: string;
}

function Button({ customStyle = '', text, ...rest }: ButtonProps) {
  return (
    <S.Layout $isActive={!rest.disabled} $customStyle={customStyle} {...rest}>
      {text}
    </S.Layout>
  );
}

export default Button;
