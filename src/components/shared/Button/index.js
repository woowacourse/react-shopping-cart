import React from 'react';
import PropTypes from 'prop-types';
import { Container, ButtonText } from './style';

const Button = ({
  children,
  type,
  backgroundColor,
  color,
  fontSize,
  borderColor,
  disabled,
  width,
  height,
  onClick,
}) => {
  return (
    <Container
      type={type}
      backgroundColor={backgroundColor}
      disabled={disabled}
      width={width}
      height={height}
      borderColor={borderColor}
      onClick={onClick}
      fontSize={fontSize}
      color={color}
    >
      {children}
    </Container>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  fontSize: PropTypes.string.isRequired,
  disabled: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
