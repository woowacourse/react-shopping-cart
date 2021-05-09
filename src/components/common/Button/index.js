import React from 'react';
import PropTypes from 'prop-types';
import { StyledButton } from './index.styles';

const Button = ({ children, onClick, backgroundColor = '' }) => (
  <StyledButton onClick={onClick} backgroundColor={backgroundColor}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func, // TODO: isRequired 넣기
  buttonStyle: PropTypes.string,
};

export default Button;
