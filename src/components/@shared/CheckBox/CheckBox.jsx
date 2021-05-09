import React from "react";
import PropTypes from "prop-types";
import * as S from "./CheckBox.styled";

const CheckBox = ({ id, name, label }) => (
  <S.CheckBox htmlFor={id}>
    <input type="checkbox" id={id} name={name} />
    <span>{label}</span>
  </S.CheckBox>
);

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CheckBox;
