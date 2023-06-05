import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import * as styled from './Layout.styled';

import { Header } from '../../Header/Header';
import { FallbackRender } from '../../FallbackRender/FallbackRender';

export const Layout = ({ children }: PropsWithChildren) => (
  <styled.Layout>
    <Header />
    <styled.Container>
      <ErrorBoundary fallbackRender={FallbackRender}>{children}</ErrorBoundary>
    </styled.Container>
  </styled.Layout>
);
