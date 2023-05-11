import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Flex from '../Flex';
import Header from '../Header/Header';
import PageTitle from '../PageTitle/PageTitle';
import * as S from './Layout.styles';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.Root>
      <Header />
      {children}
    </S.Root>
  );
};

export const Content = () => {
  return (
    <Flex dir="column" width="80%" style={{ margin: '0 auto' }}>
      <PageTitle />
      <Outlet />
    </Flex>
  );
};
