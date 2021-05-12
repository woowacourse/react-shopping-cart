import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Button = ({
  hoverAnimation,
  className,
  type,
  width,
  height,
  fontSize,
  color,
  backgroundColor,
  borderColor,
  children,
  onClick,
  disabled,
}) => {
  return (
    <Styled.Button
      type={type}
      hoverAnimation={hoverAnimation}
      className={className}
      width={width}
      height={height}
      color={color}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Styled.Button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  hoverAnimation: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Button.defaultProps = {
  children: '',
};

export default Button;
