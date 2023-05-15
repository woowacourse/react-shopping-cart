import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  increase: React.MouseEventHandler<HTMLButtonElement>;
  decrease: React.MouseEventHandler<HTMLButtonElement>;
}

const Counter = ({ count, increase, decrease }: CounterProps) => {
  return (
    <S.Wrapper>
      <S.CalcButton onClick={decrease}>-</S.CalcButton>
      <span>{count}</span>
      <S.CalcButton onClick={increase}>+</S.CalcButton>
    </S.Wrapper>
  );
};

export default Counter;
