import { useState } from 'react';
import { styled } from 'styled-components';

interface Props {
  initCount: number;
}

export default function Counter({ initCount }: Props) {
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

  return (
    <Style.Container>
      <button disabled={isMinCount()} onClick={decreaseCount}>
        -
      </button>
      <Style.NumberWrapper>
        <span>{count}</span>
      </Style.NumberWrapper>
      <button onClick={increaseCount}>+</button>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;

    width: 65px;
    background-color: white;
    border: 1px solid black;
  `,

  NumberWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
