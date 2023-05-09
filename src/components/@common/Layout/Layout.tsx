import { PropsWithChildren } from 'react';
import * as Styled from './Layout.styles.tsx';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Styled.Wrapper>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Wrapper>
  );
};

export default Layout;
