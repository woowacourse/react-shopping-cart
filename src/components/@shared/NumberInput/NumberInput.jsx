import React from "react";
import PropTypes from "prop-types";
import * as S from "./NumberInput.styled";
import Button from "../Button/Button";
import { CART } from "../../../constants/constants";

const NumberInput = ({ value, onChange, onBlur, min, max }) => {
  const change = (diff) => {
    const valueAsNumber = Number(value) + diff;

    onChange({
      target: { value: String(valueAsNumber), valueAsNumber },
    });
  };

  return (
    <S.NumberInput>
      <input
        type="number"
        min={min}
        max={max}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div>
        <Button theme="secondary" onClick={() => change(CART.ADD_DIFF)}>
          ▲
        </Button>
        <Button theme="secondary" onClick={() => change(-CART.ADD_DIFF)}>
          ▼
        </Button>
      </div>
    </S.NumberInput>
  );
};

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default NumberInput;
