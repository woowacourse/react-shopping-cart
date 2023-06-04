import styled from 'styled-components';

import { SetStateAction } from 'react';

interface CounterProps {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
}

export const Counter = ({ count, setCount }: CounterProps) => {
  const handleIncrease = () => {
    setCount((current) => {
      const increasedValue = current + 1;

      if (increasedValue > 999) return 999;
      return increasedValue;
    });
  };

  const handleDecrease = () => {
    setCount((current) => current - 1);
  };

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputCount = Number(e.target.value);

    if (inputCount <= 0) return setCount(1);
    if (inputCount > 999) return setCount(999);

    setCount(Number(e.target.value));
  };

  return (
    <Style.Container>
      <Style.Button onClick={handleDecrease}>➖</Style.Button>
      <Style.Input value={count} onChange={handleChangeInput} type="number" />
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
