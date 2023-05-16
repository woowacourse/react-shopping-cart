import styled from 'styled-components';

import { forwardRef } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface CounterProps {
  handleIncrease: () => void;
  handleDecrease: () => void;
  initialValue?: number;
}

export const Counter = forwardRef<HTMLInputElement, CounterProps>(
  ({ handleIncrease, handleDecrease, initialValue }, ref) => {
    return (
      <Style.Container>
        <Style.Button onClick={handleDecrease}>➖</Style.Button>
        <Style.Input
          value={initialValue ?? 1}
          ref={ref}
          type="number"
          readOnly
        />
        <Style.Button onClick={handleIncrease}>➕</Style.Button>
      </Style.Container>
    );
  }
);

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
