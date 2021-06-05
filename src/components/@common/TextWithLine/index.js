import React from 'react';
import { Container, LineText } from './index.styles';

const TextWithLine = ({ children }) => (
  <Container>
    <LineText>{children}</LineText>
  </Container>
);

export default TextWithLine;
