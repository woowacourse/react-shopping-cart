import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './style';
import { COLOR } from '../../../constants';

const Button = ({
  type,
  size,
  width,
  backgroundColor,
  borderColor,
  color,
  disabled,
  children,
  ...props
}) => {
  return (
    <Container
      type={type || 'submit'}
      size={size}
      backgroundColor={backgroundColor || COLOR.MINT}
      borderColor={borderColor || 'transparent'}
      disabled={disabled || false}
      width={width}
      color={color || COLOR.WHITE}
      {...props}
    >
      {children}
    </Container>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Button;
