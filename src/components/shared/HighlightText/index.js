import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const HighlightText = ({ color, children }) => {
  return <Container color={color}>{children}</Container>;
};

HighlightText.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default HighlightText;
