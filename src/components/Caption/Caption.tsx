import * as Styled from './style';

import { ReactNode } from 'react';

interface CationProps {
  isValid?: boolean;
  children: ReactNode;
}

const Caption = ({ isValid = true, children }: CationProps) => {
  return <Styled.Caption $isValid={isValid}>{children}</Styled.Caption>;
};

export default Caption;
