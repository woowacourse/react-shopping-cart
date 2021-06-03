import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './index.styles';

const Button = ({
  children,
  onClick,
  backgroundColor = '',
  disabled = false,
  type = 'button',
}) => (
  <StyledButton
    onClick={onClick}
    backgroundColor={backgroundColor}
    disabled={disabled}
    type={type}
  >
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  disable: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
