import React from 'react';
import * as S from './Checkbox.styled';

type InputProps = React.HTMLProps<HTMLInputElement>;

function Checkbox({ ref, as, ...props }: InputProps) {
  return <S.Checkbox {...props} type="checkbox" />;
}

export default Checkbox;
