import React from 'react';
import { Container, Line } from './index.styles';

const TextWithLine = ({ children }) => (
  <Container>
    <span>{children}</span>
    <Line />
  </Container>
);

export default TextWithLine;
