import React from "react";
import PropTypes from "prop-types";
import * as S from "./Button.styled";

const Button = ({ children, type }) => (
  <S.Button type={type}>{children}</S.Button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: "default",
};

export default Button;
