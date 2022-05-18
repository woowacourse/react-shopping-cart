import React from 'react';
import * as Styled from './Counter.style';

function Counter({ count, increase, decrease }) {
  return (
    <Styled.CounterContainer>
      <Styled.CounterButton onClick={decrease}>-</Styled.CounterButton>
      <Styled.Count>{count}</Styled.Count>
      <Styled.CounterButton onClick={increase}>+</Styled.CounterButton>
    </Styled.CounterContainer>
  );
}

export default Counter;
