import styled from 'styled-components';

import { useRef } from 'react';

interface CounterProps {
  removeItemFromCartList: () => void;
}

export const Counter = ({ removeItemFromCartList }: CounterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    inputRef.current?.stepUp();
  };

  const handleDecrease = () => {
    if (inputRef.current?.value === '0') {
      removeItemFromCartList();
      return;
    }

    inputRef.current?.stepDown();
  };

  return (
    <Style.Container>
      <Style.Button onClick={handleIncrease}>+</Style.Button>
      <Style.Input value={1} ref={inputRef} type="number" readOnly />
      <Style.Button onClick={handleDecrease}>-</Style.Button>
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
