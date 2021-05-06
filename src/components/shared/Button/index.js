import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';

const Button = ({ children, type, color, borderColor, disabled, width, height, onClick }) => {
  return (
    <Container
      type={type}
      color={color}
      disabled={disabled}
      width={width}
      height={height}
      borderColor={borderColor}
      onClick={onClick}
    >
      {children}
    </Container>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
