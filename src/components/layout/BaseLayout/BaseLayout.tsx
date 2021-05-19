import React, { ReactNode } from 'react';
import Header from 'components/shared/Header/Header';
import Styled from './BaseLayout.styles';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Styled.Root>
      <Header />
      {children}
    </Styled.Root>
  );
};

export default BaseLayout;
