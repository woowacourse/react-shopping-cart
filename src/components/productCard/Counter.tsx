import styled from "styled-components";

import { useCounterInput } from "../../hooks/useCounterInput";

interface CounterProps {
  handleMinValueExceeded?: () => void;
  handleValueChanged?: (quantity: number) => void;
  quantity?: number;
}

export const Counter = ({ handleMinValueExceeded, handleValueChanged, quantity = 1 }: CounterProps) => {
  const { inputRef, handleDecrease, handleIncrease } = useCounterInput({
    min: 0,
    handleMinValueExceeded,
    handleValueChanged,
  });

  return (
    <Style.Container>
      <Style.Button onClick={handleDecrease}>➖</Style.Button>
      <Style.Input value={quantity} ref={inputRef} type="number" readOnly />
      <Style.Button onClick={handleIncrease}>➕</Style.Button>
    </Style.Container>
  );
};

const Style = {
  Container: styled.div`
    width: 75px;
    height: 28px;

    display: flex;
    flex-wrap: nowrap;

    border: 1px solid lightgray;
  `,

  Input: styled.input`
    width: 23px;

    text-align: center;

    flex: 1;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      padding: 0;
    }
  `,

  Button: styled.button`
    all: unset;

    font-size: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
    cursor: pointer;
  `,
};
