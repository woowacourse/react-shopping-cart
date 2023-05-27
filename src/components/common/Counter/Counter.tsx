import Styled from "./CounterStyled";

interface CounterProps {
  plusQuantity: () => void;
  minusQuantity: () => void;
  quantity?: number;
  theme: object;
}

const Counter = ({
  plusQuantity,
  minusQuantity,
  quantity,
  theme,
}: CounterProps) => {
  return (
    <Styled.Container theme={theme}>
      <Styled.Button onClick={minusQuantity}>-</Styled.Button>
      <Styled.Count>{quantity}</Styled.Count>
      <Styled.Button onClick={plusQuantity}>+</Styled.Button>
    </Styled.Container>
  );
};

export default Counter;
