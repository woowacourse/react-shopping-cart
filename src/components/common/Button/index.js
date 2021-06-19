import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Button = ({ children, ...others }) => {
  return <Styled.Button {...others}>{children}</Styled.Button>;
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

export default Button;
