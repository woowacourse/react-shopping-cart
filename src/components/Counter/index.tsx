import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  add: React.MouseEventHandler<HTMLButtonElement>;
  remove: React.MouseEventHandler<HTMLButtonElement>;
}

const Counter = ({ count, add, remove }: CounterProps) => {
  return (
    <S.Wrapper>
      <S.CalcButton onClick={remove}>-</S.CalcButton>
      <span>{count}</span>
      <S.CalcButton onClick={add}>+</S.CalcButton>
    </S.Wrapper>
  );
};

export default Counter;
