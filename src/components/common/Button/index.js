import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Button = ({ type, width, height, fontSize, color, backgroundColor, borderColor, children, onClick }) => {
  return (
    <Styled.Button
      type={type}
      width={width}
      height={height}
      color={color}
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onClick={onClick}
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
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Button.defaultProps = {
  children: '',
};

export default Button;
