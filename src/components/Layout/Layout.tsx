import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

function Layout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

export default Layout;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 440px;
  height: 100vh;
  background-color: #ffffff;
`;
