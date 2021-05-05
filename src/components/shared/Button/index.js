import React from 'react';
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

export default Button;
