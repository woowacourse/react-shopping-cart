import React from "react";
import * as S from "./NumberInput.styled";

function NumberInput({
  value,
  onChangeValue,
  onClickIncreaseButton,
  onClickDecreaseButton,
  ...rest
}) {
  return (
    <S.NumberInputContainer>
      <S.Input type="number" value={value} onChange={onChangeValue} {...rest} />
      <S.ArrowButtonContainer>
        <S.ArrowButton onClick={onClickIncreaseButton}>▲</S.ArrowButton>
        <S.ArrowButton onClick={onClickDecreaseButton}>▼</S.ArrowButton>
      </S.ArrowButtonContainer>
    </S.NumberInputContainer>
  );
}

export default NumberInput;
