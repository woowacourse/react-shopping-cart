import Styled from "./CounterStyled";

interface CounterProps {
  onPlus: () => void;
  onMinus: () => void;
  quantity?: number;
  theme: object;
}

const Counter = ({ onPlus, onMinus, quantity, theme }: CounterProps) => {
  return (
    <Styled.Container theme={theme}>
      <Styled.Button onClick={onPlus}>-</Styled.Button>
      <Styled.Count>{quantity}</Styled.Count>
      <Styled.Button onClick={onMinus}>+</Styled.Button>
    </Styled.Container>
  );
};

export default Counter;
