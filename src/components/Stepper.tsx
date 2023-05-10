import { ChangeEvent, useState } from 'react';
import { styled } from 'styled-components';
import Button from './common/Button';

interface Props {
  initCount: number;
}

export default function Stepper({ initCount }: Props) {
  const [count, setCount] = useState(initCount);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => prev - 1);
  };

  const isMinCount = () => {
    if (count === 1) return true;

    return false;
  };

  const isMaxCount = () => {
    if (count === 99) return true;

    return false;
  };

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!/^[0-9]*$/.test(target.value)) return;

    const value = Number(target.value);
    if (value > 99) return setCount(99);
    if (value < 1) return setCount(1);

    setCount(value);
  };

  return (
    <Style.Container>
      <Button bgColor="primary" designType="square" disabled={isMinCount()} onClick={decreaseCount}>
        -
      </Button>
      <Style.CountInput value={count} onChange={handleChange} />
      <Button designType="square" disabled={isMaxCount()} onClick={increaseCount}>
        +
      </Button>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;

    width: 80px;
    height: 30px;
    background-color: var(--grey-100);
    border: 1px solid var(--grey-200);
    border-radius: 7px;

    & > * {
      flex: 1;
    }
  `,

  CountInput: styled.input`
    border: none;
    width: 0;

    text-align: center;

    &:focus {
      outline: none;
    }
  `,
};
