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
  fontWeight,
  color,
  backgroundColor,
  borderColor,
  children,
  onClick,
  disabled,
  cursor,
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
      fontWeight={fontWeight}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      disabled={disabled}
      onClick={onClick}
      cursor={cursor}
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
  fontWeight: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  disabled: PropTypes.bool,
  cursor: PropTypes.oneOf(['default', 'pointer']),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Button.defaultProps = {
  children: '',
  disabled: false,
  cursor: 'pointer',
};

export default Button;
