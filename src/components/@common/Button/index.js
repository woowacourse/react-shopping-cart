import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './index.styles';

const Button = ({ children, backgroundColor = '', onClick, ...attrs }) => (
  <StyledButton onClick={onClick} backgroundColor={backgroundColor} {...attrs}>
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
