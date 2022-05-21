import { useState } from 'react';
import Styled from './index.style';

const Counter = ({ quantity }) => {
  const [count, setCount] = useState(quantity ?? 0);

  return (
    <Styled.Counter>
      <Styled.Count>{count}</Styled.Count>
      <Styled.CountButton>▲</Styled.CountButton>
      <Styled.CountButton>▼</Styled.CountButton>
    </Styled.Counter>
  );
};

export default Counter;
