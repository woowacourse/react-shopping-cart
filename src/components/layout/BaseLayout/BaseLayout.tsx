import React, { ReactElement, ReactNode } from 'react';
import Header from '../../shared/Header/Header';
import Styled from './BaseLayout.styles';

interface IProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: IProps): ReactElement => {
  return (
    <Styled.Root>
      <Header />
      {children}
    </Styled.Root>
  );
};

export default BaseLayout;
