import React from "react";
import {
  StyledArrowButton,
  StyledArrowButtonContainer,
  StyledInput,
  StyledNumberInputContainer,
} from "./NumberInput.styled";

function NumberInput({
  value,
  onChangeValue,
  onClickIncreaseButton,
  onClickDecreaseButton,
  ...rest
}) {
  return (
    <StyledNumberInputContainer>
      <StyledInput
        type="number"
        value={value}
        onChange={onChangeValue}
        {...rest}
      />
      <StyledArrowButtonContainer>
        <StyledArrowButton onClick={onClickIncreaseButton}>▲</StyledArrowButton>
        <StyledArrowButton onClick={onClickDecreaseButton}>▼</StyledArrowButton>
      </StyledArrowButtonContainer>
    </StyledNumberInputContainer>
  );
}

export default NumberInput;
