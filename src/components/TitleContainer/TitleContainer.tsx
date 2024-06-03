import * as Styled from './style';

import { ReactNode } from 'react';

interface TitleContainerProps {
  children: ReactNode;
}

const TitleContainer = ({ children }: TitleContainerProps) => {
  return <Styled.TitleContainer>{children}</Styled.TitleContainer>;
};

export default TitleContainer;
