import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './index.styles';

const Button = ({ children, backgroundColor = '', ...attrs }) => (
  <StyledButton backgroundColor={backgroundColor} {...attrs}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  buttonStyle: PropTypes.string,
};

export default Button;
