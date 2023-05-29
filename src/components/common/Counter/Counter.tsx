import { styled } from 'styled-components';
import { WIDTH } from '../../../styles/mediaQuery';

interface CounterProps {
  plusOne: () => void;
  minusOne: () => void;
  quantity?: number;
}

const Counter = ({ plusOne, minusOne, quantity }: CounterProps) => {
  return (
    <Container>
      <Button onClick={minusOne}>-</Button>
      <Count>{quantity}</Count>
      <Button onClick={plusOne}>+</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 72px;
  height: 32px;

  border: 1px solid grey;
  border-radius: 3px;
  -webkit-box-pack: center;

  @media (max-width: ${WIDTH.MD}) {
    width: 48px;
    height: 24px;
    font-size: 9px;
  }
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40%;
  height: 100%;

  border-left: 0.5px solid grey;
  border-right: 0.5px solid grey;
`;

const Button = styled.button`
  width: 30%;
  height: 100%;

  text-align: center;
`;

export default Counter;
