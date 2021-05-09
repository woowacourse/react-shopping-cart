import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styled";

const Button = ({ children, type, onClick, disabled }) => (
  <S.Button type={type} onClick={onClick} disabled={disabled}>
    {children}
  </S.Button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: "default",
  disabled: false,
};

export default Button;
