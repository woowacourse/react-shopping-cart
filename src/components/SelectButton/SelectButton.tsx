import * as Styled from './style';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface SelectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SelectButton = ({
  children,

  ...props
}: SelectButtonProps) => {
  return <Styled.SelectButton {...props}>{children}</Styled.SelectButton>;
};

export default SelectButton;
