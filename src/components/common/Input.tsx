import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  styled: CSSProp;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(({ ...props }, ref) => {
  return <S.Input ref={ref} {...props} autoComplete="on" />;
});

const S = {
  Input: styled.input<{ styled: CSSProp }>`
    ${(props) => props.styled}
  `,
};

export default Input;
