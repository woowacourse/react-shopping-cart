import { styled } from "styled-components";

interface CounterProps {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const Counter = ({ count, increase, decrease }: CounterProps) => {
  return (
    <CounterWrapper>
      <CountBox value={count} />
      <ArrowBox onClick={increase} />
      <ArrowBox onClick={decrease} />
    </CounterWrapper>
  );
};

const CounterWrapper = styled.div`
  display: flex;
`;

const CountBox = styled.input`
  width: 41.6px;
  height: 28px;
  border: 1px solid #dddddd;

  :focus {
    outline: none;
  }
`;

const ArrowBox = styled.button``;

export default Counter;
