import { InputHTMLAttributes, forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  styled: CSSProp;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <S.Input ref={ref} {...props} />;
});

const S = {
  Input: styled.input<{ styled: CSSProp }>`
    ${(props) => props.styled}
  `,
};

export default Input;
