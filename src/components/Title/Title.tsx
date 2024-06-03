import * as Styled from './style';

import { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <Styled.Title>{children}</Styled.Title>;
};

export default Title;
