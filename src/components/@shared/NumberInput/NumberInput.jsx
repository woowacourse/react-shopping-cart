import React from "react";
import PropTypes from "prop-types";
import * as S from "./NumberInput.styled";
import Button from "../Button/Button";

const NumberInput = ({ value, onChange }) => (
  <S.NumberInput>
    <input type="number" value={value} onChange={onChange} />
    <div>
      <Button type="secondary">▲</Button>
      <Button type="secondary">▼</Button>
    </div>
  </S.NumberInput>
);

NumberInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberInput;
