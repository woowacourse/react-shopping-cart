import React from "react";
import PropTypes from "prop-types";
import * as S from "./NumberInput.styled";
import Button from "../Button/Button";

const NumberInput = ({ value, onChange, onBlur }) => {
  const change = (diff) => {
    const valueAsNumber = Number(value) + diff;
    if (valueAsNumber <= 0) return;

    onChange({
      target: { value: String(valueAsNumber), valueAsNumber },
    });
  };

  return (
    <S.NumberInput>
      <input
        type="number"
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div>
        <Button type="secondary" onClick={() => change(1)}>
          ▲
        </Button>
        <Button type="secondary" onClick={() => change(-1)}>
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
};

export default NumberInput;
