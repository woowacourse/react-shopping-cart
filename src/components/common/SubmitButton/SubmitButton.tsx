import { ButtonHTMLAttributes } from 'react';
import * as S from './SubmitButton.style';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

function SubmitButton({ content, ...rest }: SubmitButtonProps) {
  return (
    <S.ButtonWrapper $isActive={!rest.disabled} {...rest}>
      {content}
    </S.ButtonWrapper>
  );
}

export default SubmitButton;
