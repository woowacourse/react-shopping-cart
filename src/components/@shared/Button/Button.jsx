import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styled";

const Button = ({ children, theme, onClick, disabled }) => (
  <S.Button theme={theme} onClick={onClick} disabled={disabled}>
    {children}
  </S.Button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  theme: "default",
  disabled: false,
};

export default Button;
