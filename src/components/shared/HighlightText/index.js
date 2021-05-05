import React from 'react';
import { Container } from './style';

const HighlightText = ({ color, children }) => {
  return <Container color={color}>{children}</Container>;
};

export default HighlightText;
