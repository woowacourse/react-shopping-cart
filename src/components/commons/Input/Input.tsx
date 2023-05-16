import { InputHTMLAttributes } from 'react';

import { StyledInput } from '@commons/Input/Input.styled';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};
