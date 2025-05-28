import { PropsWithChildren, useRef } from 'react';
import styled from '@emotion/styled';

import { useScrollStatus } from '../hooks/useScrollStatus';

export const CartListContainer = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isScrolled } = useScrollStatus(containerRef);

  return (
    <StyledCartListContainer>
      <StyledGradientOverlay isScrolled={isScrolled} />
      {children}
    </StyledCartListContainer>
  );
};

const StyledCartListContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 350px;
  overflow-y: auto;
  padding: 0px 20px;
  flex: 2;
`;

const StyledGradientOverlay = styled.div<{ isScrolled: boolean }>`
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 25px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), transparent);
  opacity: ${({ isScrolled }) => (isScrolled ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
  z-index: 10;
`;
