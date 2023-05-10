import { useState } from 'react';
import * as S from './Counter.styles';

const Counter = () => {
  const [currentCount, setCurrentCount] = useState(1);

  return (
    <S.Wrapper>
      <S.CalcButton
        onClick={() => setCurrentCount((prev) => prev - 1)}
        disabled={currentCount === 1}
      >
        -
      </S.CalcButton>
      <span>{currentCount}</span>
      <S.CalcButton onClick={() => setCurrentCount((prev) => prev + 1)}>
        +
      </S.CalcButton>
    </S.Wrapper>
  );
};

export default Counter;
