import React from 'react';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  border-radius: 2px;

  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => props.border};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackgroundColor};
    border: ${(props) => props.hoverBorder};
    font-weight: ${(props) => props.hoverFontWeight};
  }

  &:disabled {
    background-color: ${(props) => props.disabledBackgroundColor};
    border: ${(props) => props.disabledBorder};
    color: ${(props) => props.disabledColor};
    cursor: not-allowed;
    font-weight: ${(props) => props.disabledFontWeight};
  }

  && {
    ${(props) => props.css}
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,

  css: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  fontSize: PropTypes.string,

  hoverColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  hoverBorder: PropTypes.string,
  hoverFontWeight: PropTypes.number,

  disabledBackgroundColor: PropTypes.string,
  disabledBorder: PropTypes.string,
  disabledColor: PropTypes.string,
  disabledFontWeight: PropTypes.number,
};

Button.defaultProps = {
  backgroundColor: 'inherit',
  border: 'none',
  fontWeight: 400,
  hoverBorder: 'none',
  hoverFontWeight: 700,
  disabledBorder: 'none',
  disabledFontWeight: 400,
};

export default Button;
