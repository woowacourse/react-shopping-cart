import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const IconButton = ({ children, size, type, ariaLabel, ...props }) => {
  return (
    <Container type={type || 'submit'} size={size || 'small'} aria-label={ariaLabel} {...props}>
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
