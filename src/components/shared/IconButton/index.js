import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const IconButton = ({ children, size, type, onClick, ariaLabel }) => {
  return (
    <Container
      type={type || 'submit'}
      onClick={onClick}
      size={size || 'small'}
      aria-label={ariaLabel}
    >
      {children}
    </Container>
  );
};

IconButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium']),
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired,
};

export default IconButton;
