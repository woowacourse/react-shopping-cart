import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  increase: React.MouseEventHandler<HTMLButtonElement>;
  decrease: React.MouseEventHandler<HTMLButtonElement>;
  isOnlyOverOne?: boolean;
}

const Counter = ({
  count,
  increase,
  decrease,
  isOnlyOverOne,
}: CounterProps) => {
  return (
    <S.Wrapper>
      <S.CalcButton onClick={decrease} disabled={count === 1 && isOnlyOverOne}>
        -
      </S.CalcButton>
      <span>{count}</span>
      <S.CalcButton onClick={increase}>+</S.CalcButton>
    </S.Wrapper>
  );
};

export default Counter;
