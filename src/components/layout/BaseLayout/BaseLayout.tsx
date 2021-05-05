import React, { ReactNode } from 'react';
import Styled from './BaseLayout.styles';

type BaseLayoutProps = {
  children: ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Styled.Root>
      <header />
      {children}
    </Styled.Root>
  );
};

export default BaseLayout;
