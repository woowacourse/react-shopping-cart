import * as Styled from './style';

import { ReactNode } from 'react';

interface SelectButtonProps {
  children: ReactNode;
  handleOnClick: () => void;
}

const SelectButton = ({ children, handleOnClick }: SelectButtonProps) => {
  return (
    <Styled.SelectButton onClick={handleOnClick}>
      {children}
    </Styled.SelectButton>
  );
};

export default SelectButton;
