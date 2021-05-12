import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  position: relative;

  &::after {
    position: absolute;
    display: inline-block;
    content: ' ';
    width: 100%;
    left: 0px;
    bottom: 0px;
    z-index: -1;

    height: ${({ height }) => height || '8px'};
    background-color: ${({ backgroundColor }) => backgroundColor || 'rgba(42, 193, 188, 0.5)'};
  }
`;

const TextHighlight = ({ children, height, backgroundColor }) => (
  <Container height={height} backgroundColor={backgroundColor}>
    {children}
  </Container>
);

export default TextHighlight;
