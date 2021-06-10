import React from "react";
import PropTypes from "prop-types";
import * as S from "./NumberInput.styled";
import Button from "../Button/Button";

const NumberInput = ({ value, changeAmount, min, max }) => {
  const increaseNumber = () => {
    changeAmount(1);
  };

  const decreaseNumber = () => {
    changeAmount(-1);
  };

  return (
    <S.NumberInput>
      <input type="number" min={min} max={max} value={value} disabled />
      <div>
        <Button theme="secondary" onClick={increaseNumber}>
          ▲
        </Button>
        <Button theme="secondary" onClick={decreaseNumber}>
          ▼
        </Button>
      </div>
    </S.NumberInput>
  );
};

NumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  changeAmount: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default NumberInput;
