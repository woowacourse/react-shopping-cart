import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Button = ({ type, width, height, fontSize, color, backgroundColor, borderColor, children }) => {
  return (
    <Styled.Button
      type={type}
      width={width}
      height={height}
      color={color}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {children}
    </Styled.Button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.elementType]),
};

Button.defaultProps = {
  children: '',
};

export default Button;
