import React, { ReactElement, ReactNode } from 'react';
import Header from 'components/shared/Header/Header';
import Styled from './BaseLayout.styles';

interface Props {
  children: ReactNode;
}

const BaseLayout = ({ children }: Props): ReactElement => {
  return (
    <Styled.Root>
      <Header />
      {children}
    </Styled.Root>
  );
};

export default BaseLayout;
