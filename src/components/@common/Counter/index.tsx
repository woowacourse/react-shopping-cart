import { CountMethod } from 'src/hooks/useCartUpdate';
import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  productCountMethod: (type: CountMethod) => void;
  isOnlyOverOne?: boolean;
}

const Counter = ({
  count,
  productCountMethod,
  isOnlyOverOne,
}: CounterProps) => {
  const increase = () => productCountMethod('increase');
  const decrease = () => productCountMethod('decrease');

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
