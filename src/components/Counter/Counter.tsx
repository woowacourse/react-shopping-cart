import Styled from "./CounterStyled";

interface CounterProps {
  plusQuantity: () => void;
  minusQuantity: () => void;
  quantity?: number;
}

const Counter = ({ plusQuantity, minusQuantity, quantity }: CounterProps) => {
  return (
    <Styled.Container>
      <Styled.Button onClick={minusQuantity}>-</Styled.Button>
      <Styled.Count>{quantity}</Styled.Count>
      <Styled.Button onClick={plusQuantity}>+</Styled.Button>
    </Styled.Container>
  );
};

export default Counter;
