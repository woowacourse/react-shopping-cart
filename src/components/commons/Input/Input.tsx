import { InputHTMLAttributes } from 'react';

import { StyledInput } from '@commons/Input/Input.styled';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};
