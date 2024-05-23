import * as Styled from './style';

import { ReactNode } from 'react';

interface CationProps {
  children: ReactNode;
}

const Caption = ({ children }: CationProps) => {
  return <Styled.Caption>{children}</Styled.Caption>;
};

export default Caption;
