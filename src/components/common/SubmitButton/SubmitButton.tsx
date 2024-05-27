import { ButtonHTMLAttributes } from 'react';
import * as S from './SubmitButton.style';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

function SubmitButton({ text, ...rest }: SubmitButtonProps) {
  return (
    <S.ButtonWrapper $isActive={!rest.disabled} type="button" {...rest}>
      {text}
    </S.ButtonWrapper>
  );
}

export default SubmitButton;
