import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  autoComplete?: string;
  styled: CSSProp;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ autoComplete = 'on', ...props }, ref) => {
  return <S.Input ref={ref} {...props} autoComplete={autoComplete} />;
});

const S = {
  Input: styled.input<{ styled: CSSProp }>`
    ${(props) => props.styled}
  `,
};

export default Input;
