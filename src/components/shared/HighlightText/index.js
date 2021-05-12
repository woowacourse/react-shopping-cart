import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const HighlightText = ({ color, fontSize, ariaLabel, children }) => {
  return (
    <Container color={color} fontSize={fontSize} aria-label={ariaLabel}>
      {children}
    </Container>
  );
};

HighlightText.propTypes = {
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.string.isRequired,
};

export default HighlightText;
