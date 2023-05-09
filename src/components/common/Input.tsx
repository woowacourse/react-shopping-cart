import { ChangeEventHandler, InputHTMLAttributes, forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputStyle: CSSProp;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>(({ ...props }, ref) => {
  return <S.Input ref={ref} {...props} autoComplete="on" />;
});

const S = {
  Input: styled.input<{ inputStyle: CSSProp }>`
    ${(props) => props.inputStyle}
  `,
};

export default Input;
