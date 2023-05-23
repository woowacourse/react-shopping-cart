import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  min?: number;
  increment: React.MouseEventHandler<HTMLButtonElement>;
  decrement: React.MouseEventHandler<HTMLButtonElement>;
}

const Counter = ({ count, min, increment, decrement }: CounterProps) => {
  return (
    <S.Wrapper>
      <S.CalcButton onClick={decrement} disabled={count === min}>
        -
      </S.CalcButton>
      <span>{count}</span>
      <S.CalcButton onClick={increment}>+</S.CalcButton>
    </S.Wrapper>
  );
};

export default Counter;
