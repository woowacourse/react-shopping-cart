import React from "react";
import {
  ArrowButton,
  CounterButtonContainer,
  CounterContainer,
  CounterInput,
} from "./styled";

function Counter({
  count,
  handleClickIncreaseButton,
  handleClickDecreaseButton,
}) {
  return (
    <CounterContainer>
      <div>
        <CounterInput type="number" readOnly="readonly" value={count} />
      </div>
      <CounterButtonContainer>
        <ArrowButton type="button" onClick={handleClickIncreaseButton}>
          ▲
        </ArrowButton>
        <ArrowButton type="button" onClick={handleClickDecreaseButton}>
          ▼
        </ArrowButton>
      </CounterButtonContainer>
    </CounterContainer>
  );
}

export default Counter;
