import { ReactNode } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  background-color: lightGray;
`;

const LimitedWidthContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 768px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: white;
  scrollbar-width: none;
`;

type MobileLayoutProps = {
  children: ReactNode;
};

const MobileLayout = ({ children, ...rest }: MobileLayoutProps) => {
  return (
    <Background>
      <LimitedWidthContainer {...rest}>{children}</LimitedWidthContainer>
    </Background>
  );
};

export default MobileLayout;
