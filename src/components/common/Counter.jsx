import React, { useState } from "react";
import styled from "styled-components";

const CounterContainer = styled.div`
  display: flex;

  width: fit-content;

  border: 1px solid ${({ theme: { color } }) => color.border};

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CounterInput = styled.input`
  width: 40px;
  height: 40px;
  padding: 4px;

  text-align: center;
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  outline: none;
  border: none;
  border-right: 1px solid ${({ theme: { color } }) => color.border};
`;

const CounterButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArrowButton = styled.button`
  height: 50%;
  padding: 1px 2px;

  background-color: ${({ theme: { color } }) => color.main};
  color: ${({ theme: { color } }) => color.text};
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme: { color } }) => color.border};

  :last-child {
    border-bottom: none;
  }

  :active {
    color: ${({ theme: { color } }) => color.point};
  }
`;

function Counter({ min = 1, step = 1 }) {
  const [count, setCount] = useState(min);

  const handleClickIncreaseButton = () => {
    setCount((prev) => prev + step);
  };

  const handleClickDecreaseButton = () => {
    if (count <= min) return;
    setCount((prev) => prev - step);
  };

  return (
    <CounterContainer>
      <div>
        <CounterInput
          type="number"
          readOnly="readonly"
          min={min}
          value={count}
        />
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
