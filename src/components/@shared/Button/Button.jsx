import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styled";

const Button = ({ children, type, onClick }) => (
  <S.Button type={type} onClick={onClick}>
    {children}
  </S.Button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: "default",
};

export default Button;
