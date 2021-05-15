import React from "react";
import PropTypes from "prop-types";
import * as S from "./CheckBox.styled";

const CheckBox = ({ id, name, checked, onChange }) => (
  <S.CheckBox
    type="checkbox"
    id={id}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  checked: PropTypes.bool,
};

CheckBox.defaultProps = {
  id: null,
  checked: false,
};

export default CheckBox;
