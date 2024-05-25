import * as Styled from './style';

import { HTMLAttributes, ReactNode } from 'react';

interface SelectButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SelectButton = ({ children, ...props }: SelectButtonProps) => {
  return <Styled.SelectButton {...props}>{children}</Styled.SelectButton>;
};

export default SelectButton;
