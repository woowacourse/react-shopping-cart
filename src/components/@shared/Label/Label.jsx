import React from "react";
import PropTypes from "prop-types";
import * as S from "./Label.styled";

const Label = ({ htmlFor, srOnly, children }) => (
  <S.Label htmlFor={htmlFor} srOnly={srOnly}>
    {children}
  </S.Label>
);

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string,
  srOnly: PropTypes.bool,
};

Label.defaultProps = {
  htmlFor: null,
  srOnly: false,
};

export default Label;
