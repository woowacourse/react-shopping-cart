import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const HighlightText = ({ color, fontSize, children }) => {
  return (
    <Container color={color} fontSize={fontSize}>
      {children}
    </Container>
  );
};

HighlightText.propTypes = {
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default HighlightText;
