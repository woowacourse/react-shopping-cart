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
      <ArrowWrapper>
        <ArrowBox onClick={increase}>▾</ArrowBox>
        <ArrowBox onClick={decrease}>▾</ArrowBox>
      </ArrowWrapper>
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
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const ArrowBox = styled.button`
  width: 23px;
  height: 14px;
  border: 1px solid #dddddd;
  background: transparent;
  font-size: 5px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    transform: scaleY(-1);
  }
`;

export default Counter;
