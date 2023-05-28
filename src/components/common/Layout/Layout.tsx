import { PropsWithChildren } from 'react';

import * as styled from './Layout.styled';

import { Header } from '../../Header/Header';

export const Layout = ({ children }: PropsWithChildren) => (
  <styled.Layout>
    <Header />
    <styled.Container>{children}</styled.Container>
  </styled.Layout>
);
