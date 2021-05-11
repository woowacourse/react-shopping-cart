import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const IconButton = ({ children, icon, size = 'small', type, onClick, ariaLabel }) => {
  return (
    <Container type={type} onClick={onClick} size={size} aria-label={ariaLabel}>
      {children}
    </Container>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconButton;
