import { ButtonHTMLAttributes } from 'react';
import * as S from './SubmitButton.style';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  content: string;
}

function SubmitButton({ isActive, content, ...rest }: SubmitButtonProps) {
  return (
    <S.ButtonWrapper $isActive={isActive} {...rest}>
      {content}
    </S.ButtonWrapper>
  );
}

export default SubmitButton;
