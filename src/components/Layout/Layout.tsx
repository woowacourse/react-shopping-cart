import { PropsWithChildren } from 'react';
import { Container } from './Layout.styles';

function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default Layout;
