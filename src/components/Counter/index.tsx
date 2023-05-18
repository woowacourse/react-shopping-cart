import { CountMethod } from 'src/hooks/useCartUpdate';
import * as S from './Counter.styles';
interface CounterProps {
  count: number;
  productCountMethod: (
    event: React.MouseEvent<Element, MouseEvent>,
    type: CountMethod
  ) => void;
  isOnlyOverOne?: boolean;
}

const Counter = ({
  count,
  productCountMethod,
  isOnlyOverOne,
}: CounterProps) => {
  const increase = (event: React.MouseEvent<Element, MouseEvent>) =>
    productCountMethod(event, 'increase');
  const decrease = (event: React.MouseEvent<Element, MouseEvent>) =>
    productCountMethod(event, 'decrease');

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
