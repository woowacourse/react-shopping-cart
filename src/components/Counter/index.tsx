import { styled } from "styled-components";

interface CounterProps {
  plusOne: () => void;
  minusOne: () => void;
  quantity?: number;
}

const Counter = ({ plusOne, minusOne, quantity }: CounterProps) => {
  return (
    <Styled.Container>
      <Styled.Button onClick={minusOne}>-</Styled.Button>
      <Styled.Count>{quantity}</Styled.Count>
      <Styled.Button onClick={plusOne}>+</Styled.Button>
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 72px;
    height: 32px;

    border: 1px solid grey;
    border-radius: 3px;
    -webkit-box-pack: center;
  `,

  Count: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40%;
    height: 100%;

    border-left: 0.5px solid grey;
    border-right: 0.5px solid grey;
  `,

  Button: styled.button`
    width: 30%;
    height: 100%;

    text-align: center;
    cursor: pointer;
  `,
};

export default Counter;
