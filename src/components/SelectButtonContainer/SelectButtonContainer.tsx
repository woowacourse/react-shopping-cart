import * as Styled from './style';

import { ReactNode } from 'react';

export type GapType = 'narrow' | 'wide';

interface SelectButtonContainerProps {
  gap: GapType;
  children: ReactNode;
}

const SelectButtonContainer = ({
  gap,
  children,
}: SelectButtonContainerProps) => {
  return (
    <Styled.SelectButtonContainer $gap={gap}>
      {children}
    </Styled.SelectButtonContainer>
  );
};

export default SelectButtonContainer;
