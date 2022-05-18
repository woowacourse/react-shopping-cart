import React from 'react';
import * as Styled from './Counter.style';
interface CounterPropsType {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}
function Counter({ count, increaseCount, decreaseCount }: CounterPropsType) {
  return (
    <Styled.CounterContainer>
      <Styled.CounterButton onClick={decreaseCount}>-</Styled.CounterButton>
      <Styled.Count>{count}</Styled.Count>
      <Styled.CounterButton onClick={increaseCount}>+</Styled.CounterButton>
    </Styled.CounterContainer>
  );
}

export default Counter;
