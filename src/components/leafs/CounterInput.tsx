import styled from 'styled-components';

import { isNumeric } from '../../utils/validator';

interface Props {
  count: string;
  setCount: (value: string) => void;
  min?: number;
  max?: number;
  style?: React.CSSProperties;
}

export default function CounterInput({ count, setCount, min = 0, max, style }: Props) {
  const getRangeNumber = (number: number) => {
    if (min > number) return min;
    if (max && max < number) return max;
    return number;
  };

  const onChangeInput = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumeric(value)) {
      setCount(getRangeNumber(Number(value)).toString());
    } else if (value === '') {
      setCount('');
    }
  };

  const onBlurInput = () => {
    if (count === '') setCount(min.toString());
  };

  const onCountUp = () => {
    setCount(String(Number(count) + 1));
  };

  const onCountDown = () => {
    setCount(String(Number(count) - 1));
  };

  return (
    <Wrapper style={style}>
      <Input type="text" value={count} onChange={onChangeInput} onBlur={onBlurInput} />
      <CounterBox>
        <Counter onClick={onCountUp} disabled={Number(count) === max}>
          <img src="./arrowUp.svg" />
        </Counter>
        <Counter onClick={onCountDown} disabled={Number(count) === min}>
          <img src="./arrowDown.svg" />
        </Counter>
      </CounterBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  width: 64px;
  height: 28px;

  text-align: center;
  font-size: 12px;
`;

const Input = styled.input`
  width: 64%;
  height: 100%;
  border: 1px solid #dddddd;

  text-align: center;
  font-size: inherit;
  color: #333333;
`;

const CounterBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 36%;
  height: 100%;
`;

const Counter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50%;
  border: 1px solid #dddddd;
  background: transparent;

  & > img {
    width: 48%;
    height: 32%;
  }

  &:disabled {
    background: rgba(0, 0, 0, 0.1);
    cursor: default;
  }

  &:disabled > img {
    visibility: hidden;
  }
`;
