import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  increment: React.MouseEventHandler<HTMLButtonElement>;
  decrement: React.MouseEventHandler<HTMLButtonElement>;
}

const Counter = ({ count, increment, decrement }: CounterProps) => {
  return (
    <S.Wrapper>
      <S.CalcButton onClick={decrement}>-</S.CalcButton>
      <span>{count}</span>
      <S.CalcButton onClick={increment}>+</S.CalcButton>
    </S.Wrapper>
  );
};

export default Counter;
