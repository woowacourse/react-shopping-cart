import React from 'react';

import * as Styled from 'components/common/Counter/Counter.style';

function Counter({ count, onIncrement, onDecrement }) {
  return (
    <Styled.CounterContainer>
      <Styled.CounterButton onClick={onDecrement}>-</Styled.CounterButton>
      <Styled.Count>{count}</Styled.Count>
      <Styled.CounterButton onClick={onIncrement}>+</Styled.CounterButton>
    </Styled.CounterContainer>
  );
}

export default Counter;
